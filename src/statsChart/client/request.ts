import { safeEnvFe } from "../../utils/safeEnv";

const WEB_SERVER_PORT = safeEnvFe("VITE_WEB_SERVER_PORT");

const BASE_URL = `http://localhost:${WEB_SERVER_PORT}/api`;

export const request = async <T>(path: string, method: string): Promise<T> => {
  const res = await fetch(`${BASE_URL}${path}`, { method });
  const json = await res.json();
  if (!json.success) {
    throw Error(json);
  }
  return json.data;
};
