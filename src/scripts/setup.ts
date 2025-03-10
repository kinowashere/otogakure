import { initDb } from "../repo/db";
import { listenedTracksRepo } from "../repo/listenedTracks";
import { localTracksRepo } from "../repo/localTracks";
import { spotifyAlbumsRepo } from "../repo/spotifyAlbums";
import { spotifyArtistsRepo } from "../repo/spotifyArtists";
import { spotifyTracksRepo } from "../repo/spotifyTracks";

const main = async () => {
  await initDb();
  await localTracksRepo().createIndex("spotify_track_uri");
  await spotifyTracksRepo().createIndex("uri", { unique: true });
  await spotifyTracksRepo().createIndex("album.uri");
  await spotifyTracksRepo().createIndex("artists.uri");
  await spotifyAlbumsRepo().createIndex("uri", { unique: true });
  await spotifyAlbumsRepo().createIndex("artists.uri");
  await spotifyArtistsRepo().createIndex("uri", { unique: true });

  // the big chunky bunch of indexes here
  // let's add them as needed
  await listenedTracksRepo().createIndex("track_uri");
  console.log("Db setup complete");
  process.exit(0);
};

main();
