import { safeEnv } from "../../utils/safeEnv";
import { SPOTIFY_CLIENT_ID } from "./keys";

export const AUTH_CALLBACK_PATH = "/auth_callback";
export const AUTH_CALLBACK_SERVER_PORT = Number(
  safeEnv("AUTH_CALLBACK_SERVER_PORT"),
);
const RESPONSE_TYPE = "code";

type GetAuthLinkProps = {
  scope?: string;
  state?: string;
  showDialog?: boolean;
};

export const getAuthLink = ({ scope, state, showDialog }: GetAuthLinkProps) => {
  const url = new URL("https://accounts.spotify.com/authorize");
  url.searchParams.append("redirect_uri", generateRedirectUri());
  url.searchParams.append("show_dialog", showDialog ? "true" : "false");
  url.searchParams.append("client_id", SPOTIFY_CLIENT_ID);
  url.searchParams.append("response_type", RESPONSE_TYPE);
  if (state) {
    url.searchParams.append("state", state);
  }
  if (scope) {
    url.searchParams.append("scope", scope);
  }
  return url.toString();
};

export const generateRedirectUri = () => {
  return `http://localhost:${AUTH_CALLBACK_SERVER_PORT}${AUTH_CALLBACK_PATH}`;
};
