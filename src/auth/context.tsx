import { createContext, ReactNode, useContext } from "react";
import { useSpotifyAuth } from "../spotify/auth/useSpotifyAuth";
import { AuthKeys, AuthToken } from "../spotify/auth/types";
import { useGetCurrentUserProfile } from "../spotify/web/api/users/getCurrentUserProfile";
import { CurrentUserProfile } from "../spotify/web/api/api";

export type AuthContext = {
  isAuthenticated: boolean;
  authToken: AuthToken | null;
  spotifyKeys: AuthKeys | null;
  storeKeys: (spotifyKeys: AuthKeys | null) => void;
  fetchAuthToken: (code: string) => void;
  authLink: string | null;
  currentUserProfile: CurrentUserProfile | null;
};

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { authToken, fetchAuthToken, spotifyKeys, storeKeys, authLink } =
    useSpotifyAuth();
  const accessToken = authToken?.accessToken || null;
  const { data } = useGetCurrentUserProfile(accessToken);
  const isAuthenticated = !!data?.data.uri;
  const currentUserProfile = data?.data || null;
  return (
    <AuthContext
      value={{
        isAuthenticated,
        authToken,
        spotifyKeys,
        storeKeys,
        fetchAuthToken,
        authLink,
        currentUserProfile,
      }}
    >
      {children}
    </AuthContext>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useAuth must be used inside of AuthProvider");
  }
  return context;
};
