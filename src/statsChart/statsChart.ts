import type { TopListenedChart } from "./chartTypes/topListened";

export enum StatsChartType {
  TOP_LISTENED = "top_listened",
}

export type TopListenedStatsChart = {
  type: StatsChartType.TOP_LISTENED;
  data: TopListenedChart;
};

export type StatsChart = TopListenedStatsChart;
