import { localTracksRepo } from "../repo/localTracks";
import { spotifyAlbumsRepo } from "../repo/spotifyAlbums";
import { spotifyArtistsRepo } from "../repo/spotifyArtists";
import { spotifyTracksRepo } from "../repo/spotifyTracks";
import { getAuthToken } from "../spotify/auth/authTokenUpdater";
import { uriToId } from "../spotify/utils";
import { getSeveralAlbums } from "../spotify/web/api/albums/getSeveralAlbums";
import { getSeveralArtists } from "../spotify/web/api/artists/getSeveralArtists";
import { getSeveralTracks } from "../spotify/web/api/tracks/getSeveralTracks";
import { chunk } from "lodash";

const MAX_TRACKS_CHUNK_SIZE = 50;
const MAX_ALBUMS_CHUNK_SIZE = 20;
const MAX_ARTISTS_CHUNK_SIZE = 50;
const DEFAULT_TIMEOUT = 350;

const scheduleMaybeStart = () => {
  if (!getAuthToken()) {
    setTimeout(scheduleMaybeStart, 100);
    return;
  }
  importSpotifyData();
};

const getAllUniqueTrackIds = async () => {
  const allTracks = await localTracksRepo()
    .find({}, { projection: { spotify_track_uri: 1 } })
    .toArray();

  const allSpotifyTracks = await spotifyTracksRepo()
    .find({}, { projection: { uri: 1 } })
    .toArray();

  // make a map of unique tracks from our entire collection of tracks
  const uniqueTrackIds = allTracks.reduce((acc, track) => {
    return acc.set(uriToId(track.spotify_track_uri), true);
  }, new Map<string, boolean>());

  console.log(`local tracks with unique ids: ${uniqueTrackIds.size}`);

  // remove tracks which we have already saved from Spotify
  allSpotifyTracks.forEach(({ uri }) => {
    const id = uriToId(uri);
    uniqueTrackIds.delete(id);
  });

  return [...uniqueTrackIds.entries().map(([id]) => id)];
};

const importTracks = async () => {
  console.log("starting to import tracks");
  const allUniqueTrackIds = await getAllUniqueTrackIds();
  if (!allUniqueTrackIds.length) {
    console.log("no new tracks to import. skipping");
    return;
  }
  console.log(`fetching ${allUniqueTrackIds.length} tracks`);
  const chunkedTrackIds = chunk(allUniqueTrackIds, MAX_TRACKS_CHUNK_SIZE);
  for (let i = 0; i < chunkedTrackIds.length; i += 1) {
    const trackIds = chunkedTrackIds[i];
    const res = await getSeveralTracks(trackIds);
    switch (res.success) {
      case true:
        const {
          data: { tracks },
        } = res;
        await spotifyTracksRepo().insertMany(tracks);
        await Bun.sleep(DEFAULT_TIMEOUT);
        break;
      default:
        console.error("error importing tracks", { error: res.error });
        break;
    }
  }
  console.log("finished importing tracks");
};

// for each track, we get their album
const getAllUniqueAlbumIdsFromTracks = async () => {
  const allSpotifyAlbumIdsFromTracks = await spotifyTracksRepo()
    .find({}, { projection: { "album.uri": 1 } })
    .toArray();
  const allSpotifyAlbums = await spotifyAlbumsRepo()
    .find({}, { projection: { uri: 1 } })
    .toArray();

  const uniqueAlbumIds = allSpotifyAlbumIdsFromTracks.reduce((acc, track) => {
    return acc.set(uriToId(track.album.uri), true);
  }, new Map<string, boolean>());

  console.log(`unique album ids: ${uniqueAlbumIds.size}`);

  allSpotifyAlbums.forEach(({ uri }) => {
    const id = uriToId(uri);
    uniqueAlbumIds.delete(id);
  });

  return [...uniqueAlbumIds.entries().map(([id]) => id)];
};

const importAlbums = async () => {
  console.log("starting to import albums");
  const allUniqueAlbumIds = await getAllUniqueAlbumIdsFromTracks();
  if (!allUniqueAlbumIds.length) {
    console.log("no new albums to import. skipping");
    return;
  }
  console.log(`fetching ${allUniqueAlbumIds.length} albums`);
  const chunkedAlbumIds = chunk(allUniqueAlbumIds, MAX_ALBUMS_CHUNK_SIZE);
  for (let i = 0; i < chunkedAlbumIds.length; i += 1) {
    const albumIds = chunkedAlbumIds[i];
    const res = await getSeveralAlbums(albumIds);
    switch (res.success) {
      case true:
        const {
          data: { albums },
        } = res;
        await spotifyAlbumsRepo().insertMany(albums);
        await Bun.sleep(DEFAULT_TIMEOUT);
        break;
      default:
        console.error("error importing albums", { error: res.error });
        break;
    }
  }
  console.log("finished importing albums");
};

const getAllUniqueArtistIds = async () => {
  const allArtistsFromTracks = await spotifyTracksRepo()
    .find({}, { projection: { "artists.uri": 1 } })
    .toArray();
  const allArtistsFromAlbums = await spotifyAlbumsRepo()
    .find({}, { projection: { "artists.uri": 1 } })
    .toArray();
  const uniqueArtistIds = new Map<string, boolean>();
  allArtistsFromTracks.forEach(({ artists }) => {
    artists.forEach(({ uri }) => {
      uniqueArtistIds.set(uriToId(uri), true);
    });
  });
  allArtistsFromAlbums.forEach(({ artists }) => {
    artists.forEach(({ uri }) => {
      uniqueArtistIds.set(uriToId(uri), true);
    });
  });
  console.log(
    `artists from tracks / albums with unique ids: ${uniqueArtistIds.size}`,
  );
  const allSpotifyArtists = await spotifyArtistsRepo()
    .find({}, { projection: { uri: 1 } })
    .toArray();

  allSpotifyArtists.forEach(({ uri }) => {
    const id = uriToId(uri);
    uniqueArtistIds.delete(id);
  });
  return [...uniqueArtistIds.entries().map(([id]) => id)];
};

const importArtists = async () => {
  console.log("starting to import artists");
  const uniqueArtistIds = await getAllUniqueArtistIds();
  if (!uniqueArtistIds.length) {
    console.log("no new artists to import. skipping");
    return;
  }
  console.log(`fetching ${uniqueArtistIds.length} artists`);
  const chunkedArtistIds = chunk(uniqueArtistIds, MAX_ARTISTS_CHUNK_SIZE);
  for (let i = 0; i < chunkedArtistIds.length; i += 1) {
    const artistIds = chunkedArtistIds[i];
    const res = await getSeveralArtists(artistIds);
    switch (res.success) {
      case true:
        const {
          data: { artists },
        } = res;
        await spotifyArtistsRepo().insertMany(artists);
        await Bun.sleep(DEFAULT_TIMEOUT);
        break;
      default:
        console.error("error importing artists", { error: res.error });
        break;
    }
  }
  console.log("finished import artists");
};

const importSpotifyData = async () => {
  await importTracks();
  await importAlbums();
  await importArtists();
  console.log("finished importing all Spotify data");
  process.exit(0);
};

export const initSpotifyDataImporter = () => {
  scheduleMaybeStart();
};
