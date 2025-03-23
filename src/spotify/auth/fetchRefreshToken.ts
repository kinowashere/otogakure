import { authClient } from "./authClient";
import { WithAuthKeys } from "./types";

export type RefreshToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string | null;
};

type FetchRefreshTokenProps = WithAuthKeys<{ refreshToken: string }>;

export const fetchRefreshToken = async ({
  refreshToken,
  spotifyClientId,
  spotifyClientSecret,
}: FetchRefreshTokenProps) => {
  const res = await authClient({
    body: {
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    },
    spotifyClientId,
    spotifyClientSecret,
  });
  const body = await res.json();
  if (res.status !== 200 || !body) {
    return null;
  }
  return body as RefreshToken;
};
