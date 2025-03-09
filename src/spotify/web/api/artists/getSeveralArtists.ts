import { webClient } from "../../webClient";
import type { SpotifyArtist, WebApiResponse } from "../api";

export type GetSeveralArtists = { artists: SpotifyArtist[] };

export const getSeveralArtists = async (
  ids: string[],
): Promise<WebApiResponse<GetSeveralArtists>> => {
  const query = new URLSearchParams({ ids: ids.join(",") });
  const res = await webClient({ path: "/artists", method: "GET", query });
  switch (res.status) {
    case 200:
      const data = await res.json();
      return { success: true, data };
    default:
      return { success: false, error: res };
  }
};
