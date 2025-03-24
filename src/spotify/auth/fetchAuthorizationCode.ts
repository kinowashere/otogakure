import { generateRedirectUri } from "./authLink";
import { authClient } from "./authClient";
import { WithAuthKeys } from "./types";

export type AuthorizationCode = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
};

type FetchAuthorizationCodeProps = WithAuthKeys<{
  code: string;
}>;

export const fetchAuthorizationCode = async ({
  code,
  spotifyClientId,
  spotifyClientSecret,
}: FetchAuthorizationCodeProps) => {
  const res = await authClient({
    body: {
      code,
      grant_type: "authorization_code",
      redirect_uri: generateRedirectUri(),
    },
    spotifyClientId,
    spotifyClientSecret,
  });
  const body = await res.json();
  if (res.status !== 200 || !body) {
    return null;
  }
  return body as AuthorizationCode;
};
