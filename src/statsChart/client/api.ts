import { useQuery } from "@tanstack/react-query";
import { request } from "./request";
import {
  type TopListenedStatsChart,
  type YearsListenedStatsChart,
} from "../statsChart";

enum QueryKeys {
  GetTopListened = "get_top_listened",
  YearsListened = "years_listened",
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
