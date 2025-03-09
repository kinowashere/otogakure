import type { SpotifyAlbum } from "../spotify/web/api/api";
import { db } from "./db";

export const spotifyAlbumsRepo = () =>
  db().collection<SpotifyAlbum>("spotify_albums");
