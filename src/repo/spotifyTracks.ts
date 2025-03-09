import type { SpotifyTrack } from "../spotify/web/api/api";
import { db } from "./db";

export const spotifyTracksRepo = () =>
  db().collection<SpotifyTrack>("spotify_tracks");
