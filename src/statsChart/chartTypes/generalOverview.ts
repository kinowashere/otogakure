import { statsChartsRepo } from "../../repo/charts";
import { listenedTracksRepo } from "../../repo/listenedTracks";
import { StatsChartType } from "../statsChart";
import type { Year } from "./yearsListened";

export type GeneralOverviewChart = Record<Year, GeneralOverview>;

type GeneralOverview = {
  ms_played: number;
  tracks_played: number;
  unique_albums: number;
  unique_artists: number;
  unique_tracks: number;
  unique_genres: number;
};

const getMapLen = (map?: Map<string, true>) => {
  if (!map) {
    return 0;
  }
  return [...map.keys().toArray()].length;
};

export const processGeneralOverview = async () => {
  const listenedTracks = await listenedTracksRepo()
    .find(
      {},
      {
        projection: {
          ms_played: 1,
          track_uri: 1,
          album_uri: 1,
          artist_uris: 1,
          artist_genres: 1,
          ts: 1,
        },
      },
    )
    .toArray();

  const generalOverviewChart: GeneralOverviewChart = {};
  const initialGeneralOverview: GeneralOverview = {
    ms_played: 0,
    tracks_played: 0,
    unique_albums: 0,
    unique_artists: 0,
    unique_tracks: 0,
    unique_genres: 0,
  };
  generalOverviewChart.all = { ...initialGeneralOverview };

  const uniqueArtistsMap = new Map<Year, Map<string, true>>();
  const uniqueTracksMap = new Map<Year, Map<string, true>>();
  const uniqueAlbumsMap = new Map<Year, Map<string, true>>();
  const uniqueGenresMap = new Map<Year, Map<string, true>>();

  uniqueArtistsMap.set("all", new Map());
  uniqueTracksMap.set("all", new Map());
  uniqueAlbumsMap.set("all", new Map());
  uniqueGenresMap.set("all", new Map());

  const years: Year[] = [];
  years.push("all");

  listenedTracks.forEach((listenedTrack) => {
    const year = listenedTrack.ts.getUTCFullYear();

    if (!generalOverviewChart[year]) {
      generalOverviewChart[year] = { ...initialGeneralOverview };
      uniqueArtistsMap.set(year, new Map());
      uniqueTracksMap.set(year, new Map());
      uniqueAlbumsMap.set(year, new Map());
      uniqueGenresMap.set(year, new Map());
      years.push(year);
    }

    generalOverviewChart[year].ms_played += listenedTrack.ms_played;
    generalOverviewChart["all"].ms_played += listenedTrack.ms_played;

    generalOverviewChart[year].tracks_played += 1;
    generalOverviewChart["all"].tracks_played += 1;

    uniqueAlbumsMap.get("all")?.set(listenedTrack.album_uri, true);
    uniqueAlbumsMap.get(year)?.set(listenedTrack.album_uri, true);

    uniqueTracksMap.get("all")?.set(listenedTrack.track_uri, true);
    uniqueTracksMap.get(year)?.set(listenedTrack.track_uri, true);

    listenedTrack.artist_uris.forEach((artist_uri) => {
      uniqueArtistsMap.get("all")?.set(artist_uri, true);
      uniqueArtistsMap.get(year)?.set(artist_uri, true);
    });

    listenedTrack.artist_genres.forEach((artist_genre) => {
      uniqueGenresMap.get("all")?.set(artist_genre, true);
      uniqueGenresMap.get(year)?.set(artist_genre, true);
    });
  });

  years.forEach((year) => {
    generalOverviewChart[year].unique_albums = getMapLen(
      uniqueAlbumsMap.get(year),
    );
    generalOverviewChart[year].unique_artists = getMapLen(
      uniqueArtistsMap.get(year),
    );
    generalOverviewChart[year].unique_tracks = getMapLen(
      uniqueTracksMap.get(year),
    );
    generalOverviewChart[year].unique_genres = getMapLen(
      uniqueGenresMap.get(year),
    );
  });

  await statsChartsRepo().deleteOne({ type: StatsChartType.GENERAL_OVERVIEW });
  await statsChartsRepo().insertOne({
    type: StatsChartType.GENERAL_OVERVIEW,
    data: generalOverviewChart,
  });
};
