import { generateRedirectUri } from "./authLink";
import { authClient } from "./authClient";

export type AuthorizationCode = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
};

export const fetchAuthorizationCode = async (code: string) => {
  const res = await authClient({
    code,
    grant_type: "authorization_code",
    redirect_uri: generateRedirectUri(),
  });
  const body = await res.json();
  if (res.status !== 200 || !body) {
    return null;
  }
  return body as AuthorizationCode;
};
