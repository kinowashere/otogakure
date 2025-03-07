import type { LocalTrack } from "../models/localTrack";
import { db } from "./db";

export const localTracksRepo = () =>
  db().collection<LocalTrack>("local_tracks");
