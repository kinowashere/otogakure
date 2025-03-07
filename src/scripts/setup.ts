import { initDb } from "../repo/db";
import { localTracksRepo } from "../repo/localTracks";

const main = async () => {
  await initDb();
  await localTracksRepo().createIndex("spotify_track_uri");
  console.log("Db setup complete");
  process.exit(0);
};

main();
