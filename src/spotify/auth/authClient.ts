import { getBasicKey } from "./keys";

const BASE_URL = "https://accounts.spotify.com/api/token";

export const authClient = (body: Record<string, string>) => {
  const encodedBody = new URLSearchParams(body).toString();
  return fetch(BASE_URL, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${getBasicKey()}`,
    },
    method: "POST",
    body: encodedBody,
  });
};
