import { statsChartsRepo } from "../../repo/charts";
import { StatsChartType } from "../../statsChart/statsChart";
import { safeEnv } from "../../utils/safeEnv";

const WEB_SERVER_PORT = safeEnv("WEB_SERVER_PORT");

export const initServer = () =>
  Bun.serve({
    routes: {
      "/": () => {
        return new Response("Hello, world!", { status: 200 });
      },
      "/api/chart/:type": async (req) => {
        /**
         * this will reply with a chart's data by it's id
         **/
        const type = req.params.type as StatsChartType;

        const chart = await statsChartsRepo().findOne({
          type: type,
        });

        if (!type || !Object.values(StatsChartType).includes(type) || !chart) {
          return new Response("not found", { status: 404 });
        }
        return Response.json({ chart }, { status: 200 });
      },
    },
    port: WEB_SERVER_PORT,
  });
