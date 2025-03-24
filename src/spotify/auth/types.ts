export type WithAuthKeys<T> = T & AuthKeys;

export type AuthKeys = {
  spotifyClientId: string;
  spotifyClientSecret: string;
};

export type AuthToken = {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
};
