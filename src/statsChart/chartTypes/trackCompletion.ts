import { statsChartsRepo } from "../../repo/charts";
import { listenedTracksRepo } from "../../repo/listenedTracks";
import { StatsChartType } from "../statsChart";
import type { Year } from "./yearsListened";

export type TrackCompletionChart = Record<Year, Record<number, number>>;

export const processTrackCompletion = async () => {
  const listenedTracks = await listenedTracksRepo()
    .find({}, { projection: { percentage_listened: 1, ts: 1 } })
    .toArray();

  const trackCompletionChart: TrackCompletionChart = {};
  trackCompletionChart.all = {};
  const years: Year[] = [];
  years.push("all");

  listenedTracks.forEach((listenedTrack) => {
    const year = listenedTrack.ts.getUTCFullYear();
    if (!trackCompletionChart[year]) {
      trackCompletionChart[year] = {};
    }
    const percentageListened = Math.floor(
      listenedTrack.percentage_listened * 100,
    );

    const currAll = trackCompletionChart.all[percentageListened] || 0;
    trackCompletionChart.all[percentageListened] = currAll + 1;

    const currYear = trackCompletionChart[year][percentageListened] || 0;
    trackCompletionChart[year][percentageListened] = currYear + 1;
  });

  await statsChartsRepo().deleteOne({ type: StatsChartType.TRACK_COMPLETION });
  await statsChartsRepo().insertOne({
    type: StatsChartType.TRACK_COMPLETION,
    data: trackCompletionChart,
  });
};
