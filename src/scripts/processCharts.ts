import { processCharts } from "../statsChart/process";
import { initDb } from "../repo/db";
import { parseArgs } from "util";

const main = async () => {
  await initDb();
  const { values } = parseArgs({
    args: Bun.argv,
    options: {
      all: {
        type: "boolean",
      },
    },
    strict: true,
    allowPositionals: true,
  });
  await processCharts({ shouldProcessAll: values.all });
  process.exit(0);
};

main();
