import { safeEnv } from "../../utils/safeEnv";

export const SPOTIFY_CLIENT_ID = safeEnv("SPOTIFY_CLIENT_ID");
export const SPOTIFY_CLIENT_SECRET = safeEnv("SPOTIFY_CLIENT_SECRET");

export const getBasicKey = () =>
  Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString(
    "base64",
  );
