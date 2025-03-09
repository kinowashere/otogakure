import { webClient } from "../../webClient";
import type { SpotifyAlbum, WebApiResponse } from "../api";

export type GetSeveralAlbums = { albums: SpotifyAlbum[] };

export const getSeveralAlbums = async (
  ids: string[],
): Promise<WebApiResponse<GetSeveralAlbums>> => {
  const query = new URLSearchParams({ ids: ids.join(",") });
  const res = await webClient({ path: "/albums", method: "GET", query });
  switch (res.status) {
    case 200:
      const data = await res.json();
      return { success: true, data };
    default:
      return { success: false, error: res };
  }
};
