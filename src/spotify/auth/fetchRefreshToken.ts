import { authClient } from "./authClient";

export type RefreshToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string | null;
};

export const fetchRefreshToken = async (refreshToken: string) => {
  const res = await authClient({
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });
  const body = await res.json();
  if (res.status !== 200 || !body) {
    return null;
  }
  return body as RefreshToken;
};
