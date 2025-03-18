import type { GeneralOverviewChart } from "./chartTypes/generalOverview";
import type { ListenedPerDecadeChart } from "./chartTypes/listenedPerDecade";
import type { TopListenedChart } from "./chartTypes/topListened";
import type { TrackCompletionChart } from "./chartTypes/trackCompletion";
import type { YearsListenedChart } from "./chartTypes/yearsListened";

type GenericStatsChart<T, I> = {
  type: I;
  data: T;
};

export enum StatsChartType {
  TOP_LISTENED = "top_listened",
  YEARS_LISTENED = "years_listened",
  LISTENED_PER_DECADE = "listened_per_decade",
  GENERAL_OVERVIEW = "general_overview",
  TRACK_COMPLETION = "track_completion",
}

export type TopListenedStatsChart = GenericStatsChart<
  TopListenedChart,
  StatsChartType.TOP_LISTENED
>;

export type YearsListenedStatsChart = GenericStatsChart<
  YearsListenedChart,
  StatsChartType.YEARS_LISTENED
>;

export type ListenedPerDecadeStatsChart = GenericStatsChart<
  ListenedPerDecadeChart,
  StatsChartType.LISTENED_PER_DECADE
>;

export type GeneralOverviewStatsChart = GenericStatsChart<
  GeneralOverviewChart,
  StatsChartType.GENERAL_OVERVIEW
>;

export type TrackCompletionStatsChart = GenericStatsChart<
  TrackCompletionChart,
  StatsChartType.TRACK_COMPLETION
>;

export type StatsChart =
  | TopListenedStatsChart
  | YearsListenedStatsChart
  | ListenedPerDecadeStatsChart
  | GeneralOverviewStatsChart
  | TrackCompletionStatsChart;
