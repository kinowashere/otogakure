import {
  fetchAuthorizationCode,
  type AuthorizationCode,
} from "./fetchAuthorizationCode";
import { fetchRefreshToken, type RefreshToken } from "./fetchRefreshToken";

export type AuthToken = {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
};

const AUTO_FETCHER_INTERVAL = 1_000;
const EXPIRES_AT_THRESHOLD = 60_000;

let authToken: AuthToken | null = null;
let authCode: string | null = null;

export const getAuthToken = (): AuthToken | null => authToken;
export const getAuthTokenSafe = () => {
  if (!authToken) {
    throw Error("missing auth token for safe call");
  }
  return authToken;
};
export const setAuthToken = (newAuthToken: AuthToken) => {
  authToken = newAuthToken;
};
export const setAuthTokenFromAuthorizationCode = (
  authorizationCode: AuthorizationCode,
) => {
  const now = new Date();
  const newAuthToken: AuthToken = {
    accessToken: authorizationCode.access_token,
    refreshToken: authorizationCode.refresh_token,
    expiresAt: new Date(now.getTime() + authorizationCode.expires_in * 1000),
  };
  setAuthToken(newAuthToken);
};

const setAuthTokenFromRefreshToken = (refreshToken: RefreshToken) => {
  const now = new Date();
  const newAuthToken: AuthToken = {
    accessToken: refreshToken.access_token,
    refreshToken: refreshToken.refresh_token || authToken?.refreshToken || "",
    expiresAt: new Date(now.getTime() + refreshToken.expires_in * 1000),
  };
  setAuthToken(newAuthToken);
};

export const setAuthCode = (code: string) => {
  authCode = code;
  return null;
};

const maybeFetchToken = async () => {
  if (authToken) {
    const now = new Date().getTime();
    const expiresAt = authToken.expiresAt.getTime() - EXPIRES_AT_THRESHOLD;
    if (expiresAt <= now) {
      console.log("refreshing token");
      const refreshToken = await fetchRefreshToken(authToken.refreshToken);
      if (!refreshToken) {
        throw Error("refresh token fetch failed");
      }
      console.log("token refreshed");
      setAuthTokenFromRefreshToken(refreshToken);
    }
    schedule();
    return;
  }
  if (authCode) {
    console.log("fetching authorization code");
    const authorizationCode = await fetchAuthorizationCode(authCode);
    if (!authorizationCode) {
      throw Error("authorization code fetch failed");
    }
    console.log("authorization code fetched");
    setAuthTokenFromAuthorizationCode(authorizationCode);
    authCode = null;
    schedule();
    return;
  }
  schedule();
};

const schedule = () => setTimeout(maybeFetchToken, AUTO_FETCHER_INTERVAL);

export const initAuthTokenUpdater = () => {
  maybeFetchToken();
};
