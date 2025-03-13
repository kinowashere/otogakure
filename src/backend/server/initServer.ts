import { safeEnv } from "../../utils/safeEnv";

const WEB_SERVER_PORT = safeEnv("WEB_SERVER_PORT");

export const initServer = () =>
  Bun.serve({
    routes: {
      "/": () => {
        return new Response("Hello, world!", { status: 200 });
      },
    },
    port: WEB_SERVER_PORT,
  });
