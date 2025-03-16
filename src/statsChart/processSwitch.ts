import { processTopListened } from "./chartTypes/topListened";
import { processYearsListened } from "./chartTypes/yearsListened";
import { StatsChartType } from "./statsChart";

export const processSwitch = async (type: StatsChartType) => {
  switch (type) {
    case StatsChartType.YEARS_LISTENED:
      await processYearsListened();
      break;
    case StatsChartType.TOP_LISTENED:
      await processTopListened();
      break;
  }
};
