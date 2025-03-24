import { WebApiResponse } from "./api/api";
import { WebApiError } from "./api/error";

export type QueryFn<T, I> = (
  accessToken: string,
  props: I,
) => Promise<WebApiResponse<T>>;

export const queryAdapter = async <T, I>(
  fn: QueryFn<T, I>,
  accessToken: string | null,
  props: I,
) => {
  if (!accessToken) {
    throw new WebApiError({ success: false, error: "Access Token is empty" });
  }
  const res = await fn(accessToken, props);
  switch (res.success) {
    case true:
      return res;
    default:
      throw new WebApiError(res);
  }
};
