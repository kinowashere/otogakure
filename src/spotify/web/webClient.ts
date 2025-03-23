import { sleep } from "../../utils";

type WebClientProps = {
  method: "GET" | "POST";
  path: string;
  accessToken: string;
  body?: any;
  query?: URLSearchParams;
};

type RateLimitResponse = {
  status: 0;
  retryAfter: number;
  res: Response;
};

type SuccessResponse = {
  status: 1;
  res: Response;
};

const BASE_URL = "https://api.spotify.com/v1";
const MAX_RETRIES = 10;
const DEFAULT_RETRY_AFTER_IN_MS = 15 * 1000;

export const webClient = async (props: WebClientProps) => {
  let retries = 0;
  while (true) {
    if (retries >= MAX_RETRIES) {
      throw Error("max retries reached for web client");
    }
    const result = await request(props);
    switch (result.status) {
      case 0:
        retries += 1;
        console.info(
          `rate limit / status 500 reached. retrying after: ${result.retryAfter}`,
        );
        await sleep(result.retryAfter);
        break;
      default:
        return result.res;
    }
  }
};

const request = async ({
  method,
  path,
  body,
  query,
  accessToken,
}: WebClientProps) => {
  const res = await fetch(buildUri(path, query), {
    method,
    body: buildBody(body),
    headers: buildHeaders(accessToken),
  });
  switch (res.status) {
    case 429:
    case 500:
      const rateLimit: RateLimitResponse = {
        status: 0,
        retryAfter: getRetryAfterInMs(res),
        res,
      };
      return rateLimit;
    default:
      const result: SuccessResponse = {
        status: 1,
        res,
      };
      return result;
  }
};

const getRetryAfterInMs = (res: Response) => {
  const retryAfterHeader =
    res.headers.get("retry-after") || res.headers.get("Retry-After");
  switch (retryAfterHeader) {
    case null:
      console.warn("no retry after header found!");
      return DEFAULT_RETRY_AFTER_IN_MS;
    default:
      return Number(retryAfterHeader) * 1000;
  }
};

const buildHeaders = (accessToken: string) => {
  return { Authorization: `Bearer ${accessToken}` };
};

const buildUri = (path: string, query?: URLSearchParams) => {
  const base = new URL(`${BASE_URL}${path}`);
  if (query) {
    for (const [key, value] of query.entries()) {
      base.searchParams.set(key, value);
    }
  }
  return base.toString();
};

const buildBody = (body?: any) => {
  if (!body) {
    return null;
  }
  return JSON.stringify(body);
};
