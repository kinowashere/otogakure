import type { ListenedTrack } from "../models/listenedTrack";
import { db } from "./db";

export const listenedTracksRepo = () =>
  db().collection<ListenedTrack>("listened_tracks");
