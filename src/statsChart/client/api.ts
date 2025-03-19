import { useQuery } from "@tanstack/react-query";
import { request } from "./request";
import {
  type GeneralOverviewStatsChart,
  type HeatmapPerDayStatsChart,
  type ListenedPerDecadeStatsChart,
  type TopListenedStatsChart,
  type TrackCompletionStatsChart,
  type YearsListenedStatsChart,
} from "../statsChart";

enum QueryKeys {
  GetTopListened = "get_top_listened",
  GetYearsListened = "get_years_listened",
  GetListenedPerDecade = "get_listened_per_decade",
  GetGeneralOverview = "get_general_overview",
  GetTrackCompletion = "get_track_completion",
  GetHeatmapPerDay = "get_heatmap_per_day",
}

export const useTopListened = () =>
  useQuery({
    queryFn: () => request<TopListenedStatsChart>("/chart/top_listened", "GET"),
    queryKey: [QueryKeys.GetTopListened],
    retry: false,
  });

export const useYearsListened = () =>
  useQuery({
    queryFn: () =>
      request<YearsListenedStatsChart>("/chart/years_listened", "GET"),
    queryKey: [QueryKeys.GetYearsListened],
    retry: false,
  });

export const useListenedPerDecade = () =>
  useQuery({
    queryFn: () =>
      request<ListenedPerDecadeStatsChart>("/chart/listened_per_decade", "GET"),
    queryKey: [QueryKeys.GetListenedPerDecade],
    retry: false,
  });

export const useGeneralOverview = () =>
  useQuery({
    queryFn: () =>
      request<GeneralOverviewStatsChart>("/chart/general_overview", "GET"),
    queryKey: [QueryKeys.GetGeneralOverview],
    retry: false,
  });

export const useTrackCompletion = () =>
  useQuery({
    queryFn: () =>
      request<TrackCompletionStatsChart>("/chart/track_completion", "GET"),
    queryKey: [QueryKeys.GetTrackCompletion],
    retry: false,
  });

export const useHeatmapPerDay = () =>
  useQuery({
    queryFn: () =>
      request<HeatmapPerDayStatsChart>("/chart/heatmap_per_day", "GET"),
    queryKey: [QueryKeys.GetHeatmapPerDay],
    retry: false,
  });
