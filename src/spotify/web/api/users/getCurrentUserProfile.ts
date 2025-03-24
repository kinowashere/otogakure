import { useQuery } from "@tanstack/react-query";
import { webClient } from "../../webClient";
import type { CurrentUserProfile, WebApiResponse } from "../api";
import { queryAdapter } from "../../queryAdapter";

export const GET_CURRENT_USER_PROFILE_QUERY_KEY = "get_current_user_profile";

export const getCurrentUserProfile = async (
  accessToken: string,
  _props: null,
): Promise<WebApiResponse<CurrentUserProfile>> => {
  const res = await webClient({ path: "/me", method: "GET", accessToken });
  switch (res.status) {
    case 200:
      const data = await res.json();
      return { success: true, data };
    default:
      return { success: false, error: res };
  }
};

export const useGetCurrentUserProfile = (accessToken: string | null = null) =>
  useQuery({
    queryFn: () => queryAdapter(getCurrentUserProfile, accessToken, null),
    queryKey: [GET_CURRENT_USER_PROFILE_QUERY_KEY, accessToken],
    enabled: !!accessToken,
  });
