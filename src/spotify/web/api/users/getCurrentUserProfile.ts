import { webClient } from "../../webClient";
import type { CurrentUserProfile, WebApiResponse } from "../api";

export const getCurrentUserProfile = async (): Promise<
  WebApiResponse<CurrentUserProfile>
> => {
  const res = await webClient({ path: "/me", method: "GET" });
  switch (res.status) {
    case 200:
      const data = await res.json();
      return { success: true, data };
    default:
      return { success: false, error: res };
  }
};
