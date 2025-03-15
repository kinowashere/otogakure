import { statsChartsRepo } from "../repo/charts";
import { processSwitch } from "./processSwitch";
import { StatsChartType } from "./statsChart";

type ProcessChartsProps = {
  shouldProcessAll?: boolean;
};

const getAllChartTypes = () => {
  return Object.values(StatsChartType);
};

const getChartsToProcess = async (props: ProcessChartsProps) => {
  const allChartTypes = getAllChartTypes();
  if (props.shouldProcessAll) {
    return allChartTypes;
  }
  const existingChartTypes = await statsChartsRepo()
    .find({}, { projection: { type: 1 } })
    .toArray();
  return allChartTypes.filter((chartType) => {
    const exists = existingChartTypes.some((chart) => chart.type == chartType);
    return !exists;
  });
};

export const processCharts = async (props: ProcessChartsProps) => {
  if (props.shouldProcessAll) {
    await statsChartsRepo().deleteMany({});
    console.log("cleared stats charts collection");
  }
  const chartsToProcess = await getChartsToProcess(props);
  for (let i = 0; i < chartsToProcess.length; i += 1) {
    console.log(
      `processing: ${chartsToProcess[i]} ${i + 1} / ${chartsToProcess.length}`,
    );
    await processSwitch(chartsToProcess[i]);
    console.log(`finished processing: ${chartsToProcess[i]}`);
  }
};
