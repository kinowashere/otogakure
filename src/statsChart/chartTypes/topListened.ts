import { statsChartsRepo } from "../../repo/charts";
import { listenedTracksRepo } from "../../repo/listenedTracks";
import { spotifyAlbumsRepo } from "../../repo/spotifyAlbums";
import { spotifyArtistsRepo } from "../../repo/spotifyArtists";
import { spotifyTracksRepo } from "../../repo/spotifyTracks";
import { StatsChartType } from "../statsChart";

// TODO: make it configurable
const TOP_ELEMENTS = 10;

type Year = number | string;

export type TopListenedChart = Record<
  TopListenedType,
  Record<Year, TopListenedItem[]>
>;

export type TopListenedType = "artist" | "album" | "genre" | "track";

export type TopListenedItem = {
  label: string;
  uri: string | null;
  total_ms_played: number;
};

type ProcessedMap = {
  year: number;
  values: { key: string; value: number }[];
};

const ALL_YEAR = -1;

const getSortedValuesFromMap = (genericMap: Map<string, number>) => {
  const res: { key: string; value: number }[] = [];
  for (const [key, value] of genericMap.entries()) {
    res.push({ key, value });
    res.sort((a, b) => b.value - a.value);
    if (res.length > TOP_ELEMENTS) {
      res.splice(TOP_ELEMENTS);
    }
  }
  return res;
};

const processTopFromYearMap = (
  genericMap: Map<number, Map<string, number>>,
): ProcessedMap[] => {
  return [...genericMap.entries()].map(([year, allValuesMap]) => {
    return { year, values: getSortedValuesFromMap(allValuesMap) };
  });
};

const getUrisFromProcessedMap = (data: ProcessedMap[]) => {
  const uris: string[] = [];
  data.forEach(({ values }) => {
    values.forEach(({ key }) => {
      if (!uris.includes(key)) {
        uris.push(key);
      }
    });
  });
  return uris;
};

const populateArtistData = async (data: ProcessedMap[]) => {
  const uris = getUrisFromProcessedMap(data);
  const artists = await spotifyArtistsRepo()
    .find({ uri: { $in: uris } }, { projection: { name: 1, uri: 1 } })
    .toArray();
  const initValue: Record<Year, TopListenedItem[]> = {};
  const topListendArtistChart: Record<Year, TopListenedItem[]> = data.reduce(
    (acc, { year, values }) => {
      const yearKey = year === ALL_YEAR ? "all" : year;
      const topListenedItems: TopListenedItem[] = values.map((value) => {
        const artist = artists.find(({ uri }) => uri === value.key);
        if (!artist) {
          throw Error("missing artist");
        }

        return {
          label: artist.name,
          uri: value.key,
          total_ms_played: value.value,
        };
      });
      return { ...acc, [yearKey]: topListenedItems };
    },
    initValue,
  );
  return topListendArtistChart;
};

const populateAlbumData = async (data: ProcessedMap[]) => {
  const uris = getUrisFromProcessedMap(data);
  const albums = await spotifyAlbumsRepo()
    .find(
      { uri: { $in: uris } },
      { projection: { name: 1, uri: 1, "artists.name": 1, release_date: 1 } },
    )
    .toArray();
  const initValue: Record<Year, TopListenedItem[]> = {};
  const topListendAlbumChart: Record<Year, TopListenedItem[]> = data.reduce(
    (acc, { year, values }) => {
      const yearKey = year === ALL_YEAR ? "all" : year;
      const topListenedItems: TopListenedItem[] = values.map((value) => {
        const album = albums.find(({ uri }) => uri === value.key);

        if (!album) {
          throw Error("missing album");
        }

        const releaseYear = new Date(album.release_date).getUTCFullYear();

        return {
          label: `${album.name} (${releaseYear}) - ${album.artists.map(({ name }) => name).join(", ")}`,
          uri: value.key,
          total_ms_played: value.value,
        };
      });
      return { ...acc, [yearKey]: topListenedItems };
    },
    initValue,
  );
  return topListendAlbumChart;
};

const populateTrackData = async (data: ProcessedMap[]) => {
  const uris = getUrisFromProcessedMap(data);
  const tracks = await spotifyTracksRepo()
    .find(
      { uri: { $in: uris } },
      { projection: { name: 1, uri: 1, "artists.name": 1, "album.name": 1 } },
    )
    .toArray();
  const initValue: Record<Year, TopListenedItem[]> = {};
  const topListendTrackChart: Record<Year, TopListenedItem[]> = data.reduce(
    (acc, { year, values }) => {
      const yearKey = year === ALL_YEAR ? "all" : year;
      const topListenedItems: TopListenedItem[] = values.map((value) => {
        const track = tracks.find(({ uri }) => uri === value.key);

        if (!track) {
          throw Error("missing track");
        }

        return {
          label: `${track.name} (${track.album.name}) - ${track.artists.map(({ name }) => name).join(", ")}`,
          uri: value.key,
          total_ms_played: value.value,
        };
      });
      return { ...acc, [yearKey]: topListenedItems };
    },
    initValue,
  );
  return topListendTrackChart;
};

const populateGenreData = (data: ProcessedMap[]) => {
  const initValue: Record<Year, TopListenedItem[]> = {};
  const topListenedGenreChart: Record<Year, TopListenedItem[]> = data.reduce(
    (acc, { year, values }) => {
      const yearKey = year === ALL_YEAR ? "all" : year;
      const topListenedItems: TopListenedItem[] = values.map((value) => {
        return {
          label: value.key,
          uri: null,
          total_ms_played: value.value,
        };
      });
      return { ...acc, [yearKey]: topListenedItems };
    },
    initValue,
  );
  return topListenedGenreChart;
};

const processGeneric = (
  allYearsMap: Map<number, Map<string, number>>,
  year: number,
  key: string,
  msPlayed: number,
) => {
  if (!allYearsMap.get(year)) {
    allYearsMap.set(year, new Map());
  }
  const msPlayedYear = allYearsMap.get(year)?.get(key) || 0;
  const msPlayedAll = allYearsMap.get(ALL_YEAR)?.get(key) || 0;
  allYearsMap.get(year)?.set(key, msPlayedYear + msPlayed);
  allYearsMap.get(ALL_YEAR)?.set(key, msPlayedAll + msPlayed);
};

const processMaps = async () => {
  const allListenedTracks = await listenedTracksRepo()
    .find(
      {},
      {
        projection: {
          artist_uris: 1,
          album_uri: 1,
          ms_played: 1,
          artist_genres: 1,
          ts: 1,
          track_uri: 1,
        },
      },
    )
    .toArray();
  const tracksMsPlayed = new Map<number, Map<string, number>>();
  const albumsMsPlayed = new Map<number, Map<string, number>>();
  const artistGenresMsPlayed = new Map<number, Map<string, number>>();
  const artistsMsPlayed = new Map<number, Map<string, number>>();
  tracksMsPlayed.set(ALL_YEAR, new Map());
  albumsMsPlayed.set(ALL_YEAR, new Map());
  artistGenresMsPlayed.set(ALL_YEAR, new Map());
  artistsMsPlayed.set(ALL_YEAR, new Map());
  allListenedTracks.forEach((listenedTrack) => {
    const year = listenedTrack.ts.getUTCFullYear();

    processGeneric(
      tracksMsPlayed,
      year,
      listenedTrack.track_uri,
      listenedTrack.ms_played,
    );
    processGeneric(
      albumsMsPlayed,
      year,
      listenedTrack.album_uri,
      listenedTrack.ms_played,
    );
    listenedTrack.artist_genres.forEach((artistGenre) => {
      processGeneric(
        artistGenresMsPlayed,
        year,
        artistGenre,
        listenedTrack.ms_played,
      );
    });
    listenedTrack.artist_uris.forEach((artistUri) => {
      processGeneric(artistsMsPlayed, year, artistUri, listenedTrack.ms_played);
    });
  });

  return {
    tracksMsPlayed: processTopFromYearMap(tracksMsPlayed),
    albumsMsPlayed: processTopFromYearMap(albumsMsPlayed),
    artistGenresMsPlayed: processTopFromYearMap(artistGenresMsPlayed),
    artistsMsPlayed: processTopFromYearMap(artistsMsPlayed),
  };
};

export const processTopListened = async () => {
  const {
    artistsMsPlayed,
    albumsMsPlayed,
    tracksMsPlayed,
    artistGenresMsPlayed,
  } = await processMaps();
  const topListenedChart: TopListenedChart = {
    artist: await populateArtistData(artistsMsPlayed),
    album: await populateAlbumData(albumsMsPlayed),
    track: await populateTrackData(tracksMsPlayed),
    genre: populateGenreData(artistGenresMsPlayed),
  };
  await statsChartsRepo().deleteOne({ type: StatsChartType.TOP_LISTENED });
  await statsChartsRepo().insertOne({
    type: StatsChartType.TOP_LISTENED,
    data: topListenedChart,
  });
};
