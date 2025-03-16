import { statsChartsRepo } from "../../repo/charts";
import { listenedTracksRepo } from "../../repo/listenedTracks";
import { StatsChartType } from "../statsChart";

export type YearsListenedChart = {
  years: (number | string)[];
};

export const processYearsListened = async () => {
  const allListenedTracks = await listenedTracksRepo()
    .find({}, { projection: { ts: 1 } })
    .toArray();

  const yearsListenedMap = new Map<number, true>();
  const yearsListened: (number | string)[] = [];
  allListenedTracks.forEach(({ ts }) =>
    yearsListenedMap.set(ts.getUTCFullYear(), true),
  );

  yearsListened.push("all");
  for (const year of yearsListenedMap.keys()) {
    yearsListened.push(year);
  }
  yearsListened.sort((a, b) => Number(b) - Number(a));

  await statsChartsRepo().deleteOne({ type: StatsChartType.YEARS_LISTENED });
  await statsChartsRepo().insertOne({
    type: StatsChartType.YEARS_LISTENED,
    data: { years: yearsListened },
  });
};
