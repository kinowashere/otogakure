export const AUTH_CALLBACK_PATH = "/auth/callback";

const RESPONSE_TYPE = "code";

type GetAuthLinkProps = {
  scope?: string;
  state?: string;
  showDialog?: boolean;
  spotifyClientId: string;
};

const getBaseUrl = () => window.location.origin;

export const getAuthLink = ({
  scope,
  state,
  showDialog,
  spotifyClientId,
}: GetAuthLinkProps) => {
  const url = new URL("https://accounts.spotify.com/authorize");
  url.searchParams.append("redirect_uri", generateRedirectUri());
  url.searchParams.append("show_dialog", showDialog ? "true" : "false");
  url.searchParams.append("client_id", spotifyClientId);
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
  const baseUrl = getBaseUrl();
  return `${baseUrl}${AUTH_CALLBACK_PATH}`;
};
