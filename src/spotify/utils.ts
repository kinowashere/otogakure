import { SpotifyImage } from "./web/api/api";

export const uriToId = (uri: string) => {
  const [_spotify, _type, id] = uri.split(":");
  return id;
};

export const getBasicKey = (
  spotifyClientId: string,
  spotifyClientSecret: string,
) => btoa(spotifyClientId + ":" + spotifyClientSecret);

export const getImage = (
  images: SpotifyImage[],
  size: "largest" | "medium" | "smallest",
) => {
  if (!images.length) {
    return null;
  }
  const sorted = images.sort((a, b) => a.width - b.width);
  switch (size) {
    case "largest":
      return sorted[sorted.length - 1];
    case "smallest":
      return sorted[0];
    case "medium":
      const i = Math.floor(images.length / 2);
      return sorted[i];
  }
};
