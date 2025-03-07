import { initDb } from "../repo/db";
import { validateLocalTrack, type LocalTrack } from "../models/localTrack";
import fs from "fs";
import path from "path";
import { localTracksRepo } from "../repo/localTracks";

const DIR = "./spotify_data";

const getLocalTracks = () => {
  const files = fs.readdirSync(DIR);
  return files
    .map((fileName) => {
      if (!fileName.includes(".json")) {
        return [];
      }
      const fullPath = path.join(DIR, fileName);
      const file = fs.readFileSync(fullPath).toString();
      const jsonTracks = JSON.parse(file);
      const localTracks: (LocalTrack | null)[] = jsonTracks.map(
        (jsonTrack: any) => validateLocalTrack(jsonTrack),
      );
      return localTracks;
    })
    .flat()
    .filter((el) => el !== null);
};

const main = async () => {
  await initDb();
  await localTracksRepo().deleteMany({});
  const localTracks = getLocalTracks();
  await localTracksRepo().insertMany(localTracks);
  console.log(`Imported ${localTracks.length}`);
  process.exit(0);
};

await main();
