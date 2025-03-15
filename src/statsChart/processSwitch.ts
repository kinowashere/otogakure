import { processTopListened } from "./chartTypes/topListened";
import { StatsChartType } from "./statsChart";

export const processSwitch = async (type: StatsChartType) => {
  switch (type) {
    case StatsChartType.TOP_LISTENED:
      await processTopListened();
      break;
  }
};
