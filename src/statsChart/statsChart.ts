import type { TopListenedChart } from "./chartTypes/topListened";
import type { YearsListenedChart } from "./chartTypes/yearsListened";

type GenericStatsChart<T, I> = {
  type: I;
  data: T;
};

export enum StatsChartType {
  TOP_LISTENED = "top_listened",
  YEARS_LISTENED = "years_listened",
}

export type TopListenedStatsChart = GenericStatsChart<
  TopListenedChart,
  StatsChartType.TOP_LISTENED
>;

export type YearsListenedStatsChart = GenericStatsChart<
  YearsListenedChart,
  StatsChartType.YEARS_LISTENED
>;

export type StatsChart = TopListenedStatsChart | YearsListenedStatsChart;
