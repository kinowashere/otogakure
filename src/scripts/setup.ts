import { initDb } from "../repo/db";
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
  console.log("Db setup complete");
  process.exit(0);
};

main();
