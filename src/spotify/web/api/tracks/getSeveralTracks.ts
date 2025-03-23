import { webClient } from "../../webClient";
import type { SpotifyTrack, WebApiResponse } from "../api";

export type GetSeveralTracks = { tracks: SpotifyTrack[] };
type GetSeveralTracksProps = {
  ids: string[];
};

export const getSeveralTracks = async (
  accessToken: string,
  { ids }: GetSeveralTracksProps,
): Promise<WebApiResponse<GetSeveralTracks>> => {
  const query = new URLSearchParams({ ids: ids.join(",") });
  const res = await webClient({
    path: "/tracks",
    method: "GET",
    query,
    accessToken,
  });
  switch (res.status) {
    case 200:
      const data = await res.json();
      return { success: true, data };
    default:
      return { success: false, error: res };
  }
};
