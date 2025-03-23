import { WebApiErrorResponse } from "./api";

export class WebApiError extends Error {
  constructor({ error }: WebApiErrorResponse) {
    super(error?.toString() || "");
  }
}
