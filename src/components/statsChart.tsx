import { Bar } from "react-chartjs-2";
import {
  useGeneralOverview,
  useListenedPerDecade,
  useTopListened,
} from "../statsChart/client/api";
import { useState } from "react";
import type {
  GeneralOverviewStatsChart,
  ListenedPerDecadeStatsChart,
  TopListenedStatsChart,
} from "../statsChart/statsChart";
import { msToTime } from "../utils/msToTime";
import type { GeneralOverviewChart } from "../statsChart/chartTypes/generalOverview";

type TopListenedTab = "artist" | "album" | "track" | "genre";

const processTopListenedData = (
  selectedTab: TopListenedTab,
  year: string,
  data?: TopListenedStatsChart,
) => {
  switch (data) {
    case undefined:
      return null;
    default:
      const yearKey = year === "all" ? "all" : Number(year);
      const dataset = data.data[selectedTab][yearKey];
      const initData: { labels: string[]; data: number[] } = {
        labels: [],
        data: [],
      };
      return dataset.reduce((acc, curr) => {
        return {
          labels: [...acc.labels, curr.label],
          data: [...acc.data, curr.total_ms_played],
        };
      }, initData);
  }
};

type TopListenedChartProps = {
  year: string;
};

export const TopListenedChart = ({ year }: TopListenedChartProps) => {
  const { status, data } = useTopListened();
  const [selectedTab, selectTab] = useState<TopListenedTab>("artist");
  const tabs: TopListenedTab[] = ["artist", "album", "track", "genre"];
  const chartData = processTopListenedData(selectedTab, year, data);

  if (status == "loading" || !chartData) {
    return <div>loading...</div>;
  }

  return (
    <section className="flex flex-col space-y-1">
      <h2>top listened</h2>
      <div className="flex space-x-1">
        {tabs.map((tab) => (
          <button
            className={`cursor-pointer py-1 px-2 rounded hover:opacity-85 transition-all duration-150 ${tab == selectedTab ? "text-zinc-950 bg-amber-50" : "bg-blue-900"}`}
            onClick={() => selectTab(tab)}
            key={tab}
          >
            {tab}
          </button>
        ))}
      </div>
      <Bar
        options={{
          indexAxis: "y",
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const ms = ctx.raw as number;
                  const time = msToTime(ms);
                  return `${time} (${ms.toLocaleString()} ms)`;
                },
              },
            },
          },
        }}
        data={{
          datasets: [
            {
              data: chartData.data,
              label: `${selectedTab} listened in ms`,
            },
          ],
          labels: chartData.labels,
        }}
      />
    </section>
  );
};
const processListenedPerDecade = (
  year: string,
  data?: ListenedPerDecadeStatsChart,
) => {
  switch (data) {
    case undefined:
      return null;
    default:
      const labels: string[] = [];
      const dataset: number[] = [];
      const yearData = data.data[year];
      if (!yearData) {
        return { labels, dataset };
      }
      Object.keys(yearData).forEach((decade) => {
        labels.push(decade);
        dataset.push(yearData[Number(decade)]);
      });
      return { labels, dataset };
  }
};

type ListenedPerDecadeChartProps = {
  year: string;
};

export const ListenedPerDecadeChart = ({
  year,
}: ListenedPerDecadeChartProps) => {
  const { status, data } = useListenedPerDecade();
  const chartData = processListenedPerDecade(year, data);

  if (status == "loading" || !chartData) {
    return <div>loading...</div>;
  }

  return (
    <section className="flex flex-col space-y-1">
      <h2>time listened per decade</h2>
      <Bar
        options={{
          indexAxis: "y",
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const ms = ctx.raw as number;
                  const time = msToTime(ms);
                  return `${time} (${ms.toLocaleString()} ms)`;
                },
              },
            },
          },
        }}
        data={{
          datasets: [
            {
              data: chartData.dataset,
              label: `listened per decade in ms`,
            },
          ],
          labels: chartData.labels,
        }}
      />
    </section>
  );
};

const processGeneralOverview = (
  year: string,
  data?: GeneralOverviewStatsChart,
) => {
  if (!data) {
    return null;
  }
  return data.data[year];
};

type GeneralOverviewBlockProps = {
  title: string;
  text: string;
};

const GeneralOverviewBlock = ({ title, text }: GeneralOverviewBlockProps) => {
  return (
    <div className="flex flex-col space-y-1 rounded-xl border-2 border-zinc-700 bg-zinc-800 px-2 py-1">
      <p className="text-xs font-black font-mono">{title}</p>
      <p className="font-light font-mono text-sm">{text}</p>
    </div>
  );
};

type GeneralOverviewProps = {
  year: string;
};

export const GeneralOverview = ({ year }: GeneralOverviewProps) => {
  const { data, status } = useGeneralOverview();
  const chartData = processGeneralOverview(year, data);
  if (status == "loading" || !chartData) {
    return <div>loading...</div>;
  }
  const msPlayedText = `${msToTime(chartData.ms_played)}`;
  return (
    <section className="grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2 gap-x-2 gap-y-2">
      <GeneralOverviewBlock title="time played" text={msPlayedText} />
      <GeneralOverviewBlock
        title="total tracks"
        text={chartData.tracks_played.toLocaleString()}
      />
      <GeneralOverviewBlock
        title="unique albums"
        text={chartData.unique_albums.toLocaleString()}
      />
      <GeneralOverviewBlock
        title="unique artists"
        text={chartData.unique_artists.toLocaleString()}
      />
      <GeneralOverviewBlock
        title="unique tracks"
        text={chartData.unique_tracks.toLocaleString()}
      />
      <GeneralOverviewBlock
        title="unique genres"
        text={chartData.unique_genres.toLocaleString()}
      />
    </section>
  );
};
