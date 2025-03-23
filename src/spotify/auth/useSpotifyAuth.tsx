import { useEffect, useState } from "react";
import { AuthKeys, AuthToken, WithAuthKeys } from "./types";
import { fetchRefreshToken, RefreshToken } from "./fetchRefreshToken";
import { useMutation } from "@tanstack/react-query";
import {
  AuthorizationCode,
  fetchAuthorizationCode,
} from "./fetchAuthorizationCode";
import { deleteFromStore, getFromStore, setInStore } from "../../localStore";
import { getAuthLink } from "./authLink";

const AUTO_FETCHER_INTERVAL = 1_000;
const EXPIRES_AT_THRESHOLD = 60_000;

const AUTH_TOKEN_STORE_KEY = "auth_token";
const SPOTIFY_KEYS_STORE_KEY = "spotify_keys";

const getAuthTokenFromStore = () => {
  const fromStore = getFromStore<any>(AUTH_TOKEN_STORE_KEY);
  if (!fromStore) {
    return null;
  }
  const authToken: AuthToken = {
    accessToken: fromStore.accessToken,
    refreshToken: fromStore.refreshToken,
    expiresAt: new Date(fromStore.expiresAt),
  };
  return authToken;
};

const setAuthTokenToStore = (authToken: AuthToken) =>
  setInStore(AUTH_TOKEN_STORE_KEY, authToken);

const deleteAuthTokenFromStore = () => deleteFromStore(AUTH_TOKEN_STORE_KEY);

const getSpotifyKeysFromStore = () =>
  getFromStore<AuthKeys>(SPOTIFY_KEYS_STORE_KEY);

const setSpotifyKeysToStore = (spotifyKeys: AuthKeys) =>
  setInStore(SPOTIFY_KEYS_STORE_KEY, spotifyKeys);

const deleteSpotifyKeysFromStore = () =>
  deleteFromStore(SPOTIFY_KEYS_STORE_KEY);

const buildAuthTokenFromRefreshToken = (
  authToken: AuthToken,
  refreshToken: RefreshToken,
) => {
  const now = new Date();
  const newAuthToken: AuthToken = {
    accessToken: refreshToken.access_token,
    refreshToken: refreshToken.refresh_token || authToken?.refreshToken || "",
    expiresAt: new Date(now.getTime() + refreshToken.expires_in * 1000),
  };

  return newAuthToken;
};

type MaybeRefreshTokenProps = WithAuthKeys<{ authToken: AuthToken }>;

export const maybeRefreshToken = async ({
  spotifyClientId,
  spotifyClientSecret,
  authToken,
}: MaybeRefreshTokenProps) => {
  const refreshToken = await fetchRefreshToken({
    refreshToken: authToken.refreshToken,
    spotifyClientId,
    spotifyClientSecret,
  });
  if (!refreshToken) {
    throw Error("The refresh token process failed somehow what?!");
  }
  const newAuthToken = buildAuthTokenFromRefreshToken(authToken, refreshToken);
  return newAuthToken;
};

export const buildAuthTokenFromAuthorizationCode = (
  authorizationCode: AuthorizationCode,
) => {
  const now = new Date();
  const newAuthToken: AuthToken = {
    accessToken: authorizationCode.access_token,
    refreshToken: authorizationCode.refresh_token,
    expiresAt: new Date(now.getTime() + authorizationCode.expires_in * 1000),
  };
  return newAuthToken;
};

// NB! Use only once in the application, specifically in the AuthContext :P
export const useSpotifyAuth = () => {
  const [authToken, setAuthToken] = useState<AuthToken | null>(() =>
    getAuthTokenFromStore(),
  );
  const [spotifyKeys, setSpotifyKeys] = useState<AuthKeys | null>(() =>
    getSpotifyKeysFromStore(),
  );

  const authLink = spotifyKeys
    ? getAuthLink({ spotifyClientId: spotifyKeys.spotifyClientId })
    : null;

  const setAndStoreAuthToken = (newValue: AuthToken | null) => {
    if (newValue === null) {
      deleteAuthTokenFromStore();
    } else {
      setAuthTokenToStore(newValue);
    }
    setAuthToken(newValue);
  };

  const setAndStoreSpotifyKeys = (newValue: AuthKeys | null) => {
    if (newValue === null) {
      deleteSpotifyKeysFromStore();
    } else {
      setSpotifyKeysToStore(newValue);
    }
    setSpotifyKeys(newValue);
  };

  const maybeRefreshTokenMutation = useMutation({
    mutationFn: maybeRefreshToken,
    onSuccess: (newAuthToken) => {
      setAndStoreAuthToken(newAuthToken);
    },
    onError: (_err) => {
      setAndStoreAuthToken(null);
      setAndStoreSpotifyKeys(null);
    },
  });

  const fetchAuthorizationCodeMutation = useMutation({
    mutationFn: fetchAuthorizationCode,
    onSuccess: (authorizationCode) => {
      if (authorizationCode) {
        const newAuthToken =
          buildAuthTokenFromAuthorizationCode(authorizationCode);
        setAndStoreAuthToken(newAuthToken);
      }
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (authToken && spotifyKeys) {
        const now = new Date().getTime();
        const expiresAt = authToken.expiresAt.getTime() - EXPIRES_AT_THRESHOLD;
        if (now >= expiresAt) {
          maybeRefreshTokenMutation.mutate({ ...spotifyKeys, authToken });
        }
      }
    }, AUTO_FETCHER_INTERVAL);

    return () => clearInterval(interval);
  }, [
    authToken?.accessToken,
    authToken?.expiresAt,
    authToken?.refreshToken,
    spotifyKeys?.spotifyClientId,
    spotifyKeys?.spotifyClientSecret,
  ]);

  const fetchAuthToken = (code: string) => {
    if (!spotifyKeys) {
      return;
    }
    fetchAuthorizationCodeMutation.mutate({
      spotifyClientId: spotifyKeys.spotifyClientId,
      spotifyClientSecret: spotifyKeys.spotifyClientSecret,
      code,
    });
  };

  return {
    authToken,
    fetchAuthToken,
    spotifyKeys,
    storeKeys: setAndStoreSpotifyKeys,
    authLink,
  };
};
