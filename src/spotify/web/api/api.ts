export type WebApiResponse<T> = WebApiSuccessResponse<T> | WebApiErrorResponse;

export type SpotifyImage = {
  url: string;
  height: number;
  width: number;
};

export type WebApiSuccessResponse<T> = {
  success: true;
  data: T;
};

export type WebApiErrorResponse = {
  success: false;
  error?: any;
};
