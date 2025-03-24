import { createContext, ReactNode, useContext } from "react";
import { useSpotifyAuth } from "../spotify/auth/useSpotifyAuth";
import { AuthKeys, AuthToken } from "../spotify/auth/types";
import {
  GET_CURRENT_USER_PROFILE_QUERY_KEY,
  useGetCurrentUserProfile,
} from "../spotify/web/api/users/getCurrentUserProfile";
import { CurrentUserProfile } from "../spotify/web/api/api";
import { useQueryClient } from "@tanstack/react-query";

export type AuthContext = {
  isAuthenticated: boolean;
  authToken: AuthToken | null;
  spotifyKeys: AuthKeys | null;
  storeKeys: (spotifyKeys: AuthKeys | null) => void;
  fetchAuthToken: (code: string) => void;
  authLink: string | null;
  currentUserProfile: CurrentUserProfile | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    authToken,
    fetchAuthToken,
    spotifyKeys,
    storeKeys,
    authLink,
    logout: logoutSpotify,
  } = useSpotifyAuth();
  const accessToken = authToken?.accessToken || null;
  const { data } = useGetCurrentUserProfile(accessToken);
  const queryClient = useQueryClient();

  const isAuthenticated = !!data?.data.uri;
  const currentUserProfile = data?.data || null;
  const logout = () => {
    logoutSpotify();
    queryClient.invalidateQueries({
      queryKey: [GET_CURRENT_USER_PROFILE_QUERY_KEY],
    });
    window.location.assign(window.location.origin);
  };
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
        logout,
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
