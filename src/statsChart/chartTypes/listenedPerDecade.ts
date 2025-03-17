import { statsChartsRepo } from "../../repo/charts";
import { listenedTracksRepo } from "../../repo/listenedTracks";
import { StatsChartType } from "../statsChart";
import type { Year } from "./yearsListened";

export type ListenedPerDecadeChart = Record<Year, Record<number, number>>;

export const processListenedPerDecade = async () => {
  const allTracks = await listenedTracksRepo()
    .find({}, { projection: { ts: 1, release_date: 1, ms_played: 1 } })
    .toArray();

  const listenedPerDecadeChart: ListenedPerDecadeChart = {};
  listenedPerDecadeChart["all"] = {};
  allTracks.forEach((listenedTrack) => {
    const trackYear = listenedTrack.release_date.getUTCFullYear();
    const trackDecade = trackYear - (trackYear % 10);
    const tsYear = listenedTrack.ts.getUTCFullYear();
    const msPlayed = listenedTrack.ms_played;
    const currAll = listenedPerDecadeChart.all?.[trackDecade] || 0;
    if (!listenedPerDecadeChart[tsYear]) {
      listenedPerDecadeChart[tsYear] = {};
    }
    const currYear = listenedPerDecadeChart[tsYear]?.[trackDecade] || 0;
    listenedPerDecadeChart.all[trackDecade] = currAll + msPlayed;
    listenedPerDecadeChart[tsYear][trackDecade] = currYear + msPlayed;
  });
  await statsChartsRepo().deleteOne({
    type: StatsChartType.LISTENED_PER_DECADE,
  });
  await statsChartsRepo().insertOne({
    type: StatsChartType.LISTENED_PER_DECADE,
    data: listenedPerDecadeChart,
  });
};
