import { useQuery } from "@tanstack/react-query";
import { request } from "./request";
import {
  type GeneralOverviewStatsChart,
  type ListenedPerDecadeStatsChart,
  type TopListenedStatsChart,
  type YearsListenedStatsChart,
} from "../statsChart";

enum QueryKeys {
  GetTopListened = "get_top_listened",
  YearsListened = "years_listened",
  ListenedPerDecade = "listened_per_decade",
  GeneralOverview = "general_overview",
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
    queryKey: [QueryKeys.YearsListened],
    retry: false,
  });

export const useListenedPerDecade = () =>
  useQuery({
    queryFn: () =>
      request<ListenedPerDecadeStatsChart>("/chart/listened_per_decade", "GET"),
    queryKey: [QueryKeys.ListenedPerDecade],
    retry: false,
  });

export const useGeneralOverview = () =>
  useQuery({
    queryFn: () =>
      request<GeneralOverviewStatsChart>("/chart/general_overview", "GET"),
    queryKey: [QueryKeys.GeneralOverview],
    retry: false,
  });
