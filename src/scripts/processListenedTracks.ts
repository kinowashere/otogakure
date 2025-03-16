import type { WithId } from "mongodb";
import type { ListenedTrack } from "../models/listenedTrack";
import type { LocalTrack } from "../models/localTrack";
import { initDb } from "../repo/db";
import { localTracksRepo } from "../repo/localTracks";
import { spotifyTracksRepo } from "../repo/spotifyTracks";
import type {
  SpotifyAlbum,
  SpotifyArtist,
  SpotifyTrack,
} from "../spotify/web/api/api";
import { spotifyArtistsRepo } from "../repo/spotifyArtists";
import { spotifyAlbumsRepo } from "../repo/spotifyAlbums";
import { uniq } from "lodash";
import { listenedTracksRepo } from "../repo/listenedTracks";

const trackCache = new Map<string, WithId<SpotifyTrack>>();
const artistCache = new Map<string, WithId<SpotifyArtist>>();
const albumCache = new Map<string, WithId<SpotifyAlbum>>();

const primeTracksCache = async () => {
  const tracks = await spotifyTracksRepo()
    .find(
      {},
      {
        projection: {
          "artists.uri": 1,
          duration_ms: 1,
          explicit: 1,
          "album.uri": 1,
          uri: 1,
        },
      },
    )
    .toArray();
  tracks.forEach((track) => {
    trackCache.set(track.uri, track);
  });
  console.log(`loaded ${trackCache.size} tracks`);
};

const fetchTrack = (uri: string) => {
  const cached = trackCache.get(uri);
  if (!cached) {
    throw Error(`track not found for local track wtf: ${uri}`);
  }
  return cached;
};

const primeArtistsCache = async () => {
  const artists = await spotifyArtistsRepo()
    .find({}, { projection: { genres: 1, uri: 1 } })
    .toArray();
  artists.forEach((artist) => {
    artistCache.set(artist.uri, artist);
  });
  console.log(`loaded ${artistCache.size} artists`);
};

const fetchArtist = (uri: string) => {
  const cached = artistCache.get(uri);
  if (!cached) {
    throw Error(`artist not found for local track wtf: ${uri}`);
  }
  return cached;
};

const primeAlbumsCache = async () => {
  const albums = await spotifyAlbumsRepo()
    .find(
      {},
      { projection: { release_date: 1, release_date_precision: 1, uri: 1 } },
    )
    .toArray();
  albums.forEach((album) => {
    albumCache.set(album.uri, album);
  });
  console.log(`loaded ${albumCache.size} albums`);
};

const fetchAlbum = (uri: string) => {
  const cached = albumCache.get(uri);
  if (!cached) {
    throw Error(`album not found for local track wtf: ${uri}`);
  }
  return cached;
};

const isDataValid = (track: WithId<SpotifyTrack>) => {
  if (!track.duration_ms) {
    return false;
  }
  return true;
};

const processLocalTrack = (localTrack: LocalTrack) => {
  const track = fetchTrack(localTrack.spotify_track_uri);
  if (!isDataValid(track)) {
    return false;
  }
  const artists = track.artists.map(({ uri }) => fetchArtist(uri));
  const album = fetchAlbum(track.album.uri);
  const offlineTimestamp = localTrack.offline_timestamp
    ? new Date(localTrack.offline_timestamp)
    : null;
  const allGenres = artists.reduce((acc, curr) => {
    return [...acc, ...curr.genres];
  }, []);
  const timeStartedMs = localTrack.ts.getTime() - localTrack.ms_played;
  const listenedTrack: ListenedTrack = {
    ts: localTrack.ts,
    ms_played: localTrack.ms_played,
    track_uri: localTrack.spotify_track_uri,
    reason_start: localTrack.reason_start,
    reason_end: localTrack.reason_end,
    shuffle: Boolean(localTrack.shuffle),
    skipped: Boolean(localTrack.skipped),
    offline: Boolean(localTrack.offline),
    incognito_mode: Boolean(localTrack.incognito_mode),
    platform: localTrack.platform || null,
    conn_country: localTrack.conn_country || null,
    ip_addr: localTrack.ip_addr || null,
    offline_timestamp: offlineTimestamp,
    album_uri: track.album.uri,
    artist_uris: track.artists.map(({ uri }) => uri),
    artist_genres: uniq(allGenres),
    duration_ms: track.duration_ms,
    explicit: track.explicit,
    release_date: new Date(album.release_date),
    release_date_precision: album.release_date_precision,
    time_started: new Date(timeStartedMs),
    percentage_listened: localTrack.ms_played / track.duration_ms,
  };
  return listenedTrack;
};

const main = async () => {
  await initDb();
  await listenedTracksRepo().deleteMany({});
  await primeTracksCache();
  await primeArtistsCache();
  await primeAlbumsCache();
  const allLocalTracks = await localTracksRepo()
    .find(
      {},
      {
        projection: {
          ts: 1,
          platform: 1,
          ms_played: 1,
          conn_country: 1,
          ip_addr: 1,
          spotify_track_uri: 1,
          reason_start: 1,
          reason_end: 1,
          shuffle: 1,
          skipped: 1,
          offline: 1,
          offline_timestamp: 1,
          incognito_mode: 1,
        },
      },
    )
    .toArray();
  console.log("processing tracks...");

  const listenedTracks = allLocalTracks
    .map(processLocalTrack)
    .filter((el) => !!el);

  await listenedTracksRepo().insertMany(listenedTracks);

  console.log(`done processing ${listenedTracks.length} listened tracks`);
  process.exit(0);
};

main();
