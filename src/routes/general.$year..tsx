import { createFileRoute, useParams } from "@tanstack/react-router";
import { H1 } from "../components/text";
import { TopListenedChart } from "../components/statsChart";

//TODO: year picker component, with api
const Index = () => {
  const { year } = useParams({ from: "/general/$year/" });
  return (
    <main className="flex flex-col space-y-3">
      <H1>general</H1>
      <TopListenedChart year={year} />
    </main>
  );
};
export const Route = createFileRoute("/general/$year/")({
  component: Index,
});
