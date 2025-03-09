import { webClient } from "../../webClient";
import type { SpotifyTrack, WebApiResponse } from "../api";

export type GetSeveralTracks = { tracks: SpotifyTrack[] };

export const getSeveralTracks = async (
  ids: string[],
): Promise<WebApiResponse<GetSeveralTracks>> => {
  const query = new URLSearchParams({ ids: ids.join(",") });
  const res = await webClient({ path: "/tracks", method: "GET", query });
  switch (res.status) {
    case 200:
      const data = await res.json();
      return { success: true, data };
    default:
      return { success: false, error: res };
  }
};
