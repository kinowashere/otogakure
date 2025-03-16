import { useQuery } from "@tanstack/react-query";
import { request } from "./request";
import { type TopListenedStatsChart } from "../statsChart";

enum QueryKeys {
  GetTopListened = "get_top_listened",
}

export const useTopListened = () =>
  useQuery({
    queryFn: () => request<TopListenedStatsChart>("/chart/top_listened", "GET"),
    queryKey: [QueryKeys.GetTopListened],
    retry: false,
  });
