export type LocalTrack = {
  ts: Date;
  platform: string | null;
  ms_played: number;
  conn_country: string | null;
  ip_addr: string | null;
  master_metadata_track_name: string | null;
  master_metadata_album_artist_name: string | null;
  master_metadata_album_album_name: string | null;
  spotify_track_uri: string;
  episode_name: string | null;
  episode_show_name: string | null;
  spotify_episode_uri: string | null;
  reason_start: string | null;
  reason_end: string | null;
  shuffle: boolean;
  skipped: boolean;
  offline: boolean;
  offline_timestamp: number | null;
  incognito_mode: boolean;
};

export const validateLocalTrack = (input: any): LocalTrack | null => {
  try {
    const {
      ts,
      ms_played: msPlayed,
      spotify_track_uri: spotifyTrackUri,
    } = input as LocalTrack;

    const dateTs = new Date(ts);
    const numberMsPlayed = Number(msPlayed);

    if (
      Number.isNaN(dateTs.getTime()) ||
      numberMsPlayed <= 0 ||
      !spotifyTrackUri
    ) {
      return null;
    }

    const localTrack: LocalTrack = {
      ...input,
      ts: dateTs,
      ms_played: numberMsPlayed,
    };

    return localTrack;
  } catch (error) {
    return null;
  }
};
