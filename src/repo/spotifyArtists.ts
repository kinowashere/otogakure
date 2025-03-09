import type { SpotifyArtist } from "../spotify/web/api/api";
import { db } from "./db";

export const spotifyArtistsRepo = () =>
  db().collection<SpotifyArtist>("spotify_artists");
