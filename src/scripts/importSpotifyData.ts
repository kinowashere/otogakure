import { initDb } from "../repo/db";
import { initAuthCallbackServer } from "../spotify/auth/authCallbackServer";
import { initAuthTokenUpdater } from "../spotify/auth/authTokenUpdater";
import { getAuthLink } from "../spotify/auth/authLink";
import { initSpotifyDataImporter } from "../spotifyDataImport/spotifyDataImporter";

const main = async () => {
  await initDb();
  const authLink = getAuthLink({ showDialog: true });
  console.log(`visit the following link to get started: ${authLink}`);
  initAuthCallbackServer();
  initAuthTokenUpdater();
  initSpotifyDataImporter();
};

main();
