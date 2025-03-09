export type WebApiResponse<T> = WebApiSuccessResponse<T> | WebApiErrorResponse;

export type WebApiSuccessResponse<T> = {
  success: true;
  data: T;
};

export type WebApiErrorResponse = {
  success: false;
  error?: any;
};

export type CurrentUserProfile = {
  country: string | null;
  display_name: string | null;
  email: string | null;
  id: string;
  images: SpotifyImage[];
  uri: string;
};

export type SpotifyImage = {
  url: string;
  height: number;
  width: number;
};

export type SpotifyReleaseDatePrecision = "year" | "month" | "day";

export type SpotifyAlbumType = "album" | "single" | "compilation";

export type SpotifyTrack = {
  album: {
    uri: string;
    images: SpotifyImage[];
  };
  artists: { uri: string }[];
  duration_ms: number;
  explicit: boolean;
  href: string;
  name: string;
  uri: string;
};
