export type StatsApiResponse<T> =
  | StatsApiSuccessResponse<T>
  | StatsApiFailureResponse;

export type StatsApiSuccessResponse<T> = {
  success: true;
  data: T;
};

export type StatsApiFailureResponse = {
  success: false;
  error?: any;
};

export const success = <T>(data: T): StatsApiResponse<T> => {
  return { success: true, data };
};

export const failure = <T>(error?: any): StatsApiResponse<T> => {
  return { success: false, error: error || null };
};
