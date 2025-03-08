import { webClient } from "../../webClient";
import type { SpotifyImage, WebApiResponse } from "../api";

export type CurrentUserProfile = {
  country: string | null;
  display_name: string | null;
  email: string | null;
  id: string;
  images: SpotifyImage[];
  uri: string;
};

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
