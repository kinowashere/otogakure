import { processGeneralOverview } from "./chartTypes/generalOverview";
import { processHeatmapPerDay } from "./chartTypes/heatmapPerDay";
import { processListenedPerDecade } from "./chartTypes/listenedPerDecade";
import { processTopListened } from "./chartTypes/topListened";
import { processTrackCompletion } from "./chartTypes/trackCompletion";
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
    case StatsChartType.LISTENED_PER_DECADE:
      await processListenedPerDecade();
      break;
    case StatsChartType.GENERAL_OVERVIEW:
      await processGeneralOverview();
      break;
    case StatsChartType.TRACK_COMPLETION:
      await processTrackCompletion();
      break;
    case StatsChartType.HEATMAP_PER_DAY:
      await processHeatmapPerDay();
      break;
  }
};
