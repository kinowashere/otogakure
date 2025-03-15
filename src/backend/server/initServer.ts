import { statsChartsRepo } from "../../repo/charts";
import { StatsChartType } from "../../statsChart/statsChart";
import { safeEnv } from "../../utils/safeEnv";
import { failure, success } from "./api";

const WEB_SERVER_PORT = safeEnv("WEB_SERVER_PORT");

export const initServer = () =>
  Bun.serve({
    routes: {
      "/": () => {
        return new Response("Hello, world!", { status: 200 });
      },
      "/api/chart/:type": async (req) => {
        try {
          /**
           * this will reply with a chart's data by it's id
           **/
          const type = req.params.type as StatsChartType;

          const chart = await statsChartsRepo().findOne({
            type: type,
          });

          if (
            !type ||
            !Object.values(StatsChartType).includes(type) ||
            !chart
          ) {
            return Response.json(failure(), { status: 404 });
          }
          return Response.json(success(chart), { status: 200 });
        } catch (err) {
          return Response.json(failure(err?.toString()));
        }
      },
    },
    port: WEB_SERVER_PORT,
  });
