import { AUTH_CALLBACK_PATH, AUTH_CALLBACK_SERVER_PORT } from "./authLink";
import { setAuthCode } from "./authTokenUpdater";

export const initAuthCallbackServer = () =>
  Bun.serve({
    routes: {
      [AUTH_CALLBACK_PATH]: (req) => {
        const code = new URL(req.url).searchParams.get("code");
        if (code) {
          setAuthCode(code);
        }
        return new Response("you may close this window now", { status: 200 });
      },
    },
    port: AUTH_CALLBACK_SERVER_PORT,
  });
