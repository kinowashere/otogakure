import type { StatsChart } from "../statsChart/statsChart";
import { db } from "./db";

export const statsChartsRepo = () =>
  db().collection<StatsChart>("stats_charts");
