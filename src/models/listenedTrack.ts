export type ListenedTrack = {
  ts: Date;
  ms_played: number;
  track_uri: string;
  reason_start: string | null;
  reason_end: string | null;
  shuffle: boolean;
  skipped: boolean;
  offline: boolean;
  incognito_mode: boolean;
  platform: string | null;
  conn_country: string | null;
  ip_addr: string | null;
  offline_timestamp: Date | null;
  // Denormalized
  album_uri: string;
  artist_uris: string[];
  artist_genres: string[];
  duration_ms: number;
  explicit: boolean;
  release_date: Date;
  release_date_precision: "year" | "month" | "day";
  // Calculated
  time_started: Date;
  percentage_listened: number;
};
