import { statsChartsRepo } from "../../repo/charts";
import { listenedTracksRepo } from "../../repo/listenedTracks";
import { StatsChartType } from "../statsChart";

export type HeatmapPerDayChart = Record<
  string,
  { percentage: number; ms_played: number; year: number }
>;

export const processHeatmapPerDay = async () => {
  const listenedTracks = await listenedTracksRepo()
    .find({}, { projection: { ms_played: 1, ts: 1 } })
    .toArray();
  const heatmapPerDayChart: HeatmapPerDayChart = {};
  const maxMsPlayedByYear: Record<number, number> = {};
  listenedTracks.forEach((listenedTrack) => {
    const isoDate = listenedTrack.ts.toISOString().split("T", 1)[0];
    const year = listenedTrack.ts.getUTCFullYear();
    const prevMsPlayed = heatmapPerDayChart[isoDate]?.ms_played || 0;
    const newMsPlayed = prevMsPlayed + listenedTrack.ms_played;

    const currMaxByYear = maxMsPlayedByYear[year] || 0;
    if (newMsPlayed > currMaxByYear) {
      maxMsPlayedByYear[year] = newMsPlayed;
    }
    heatmapPerDayChart[isoDate] = {
      year,
      ms_played: newMsPlayed,
      percentage: 0,
    };
  });

  Object.keys(heatmapPerDayChart).forEach((key) => {
    const value = heatmapPerDayChart[key];
    const yearMax = maxMsPlayedByYear[value.year];
    heatmapPerDayChart[key] = {
      ...value,
      percentage: value.ms_played / yearMax,
    };
  });
  await statsChartsRepo().deleteOne({ type: StatsChartType.HEATMAP_PER_DAY });
  await statsChartsRepo().insertOne({
    type: StatsChartType.HEATMAP_PER_DAY,
    data: heatmapPerDayChart,
  });
};
