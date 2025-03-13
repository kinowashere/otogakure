import { initServer } from "../backend/server/initServer";
import { initDb } from "../repo/db";

const main = async () => {
  await initDb();
  const server = initServer();
  console.log(`server is now listening at: ${server.url}`);
};

main();
