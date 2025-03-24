import { getBasicKey } from "../utils";

const BASE_URL = "https://accounts.spotify.com/api/token";

type AuthClientProps = {
  body: Record<string, string>;
  spotifyClientId: string;
  spotifyClientSecret: string;
};

export const authClient = ({
  body,
  spotifyClientId,
  spotifyClientSecret,
}: AuthClientProps) => {
  const encodedBody = new URLSearchParams(body).toString();
  return fetch(BASE_URL, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${getBasicKey(spotifyClientId, spotifyClientSecret)}`,
    },
    method: "POST",
    body: encodedBody,
  });
};
