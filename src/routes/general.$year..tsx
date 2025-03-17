import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { H1 } from "../components/text";
import {
  GeneralOverview,
  ListenedPerDecadeChart,
  TopListenedChart,
} from "../components/statsChart";
import { YearSelector } from "../components/yearSelector";

const Index = () => {
  const { year } = useParams({ from: "/general/$year/" });
  const navigate = useNavigate({ from: "/general/$year" });
  const onSelect = (newYear: number | string) => {
    navigate({ to: "/general/$year", params: { year: newYear.toString() } });
  };
  return (
    <main className="flex flex-col space-y-3">
      <H1>general</H1>
      <YearSelector onSelect={onSelect} value={year} />
      <GeneralOverview year={year} />
      <TopListenedChart year={year} />
      <ListenedPerDecadeChart year={year} />
    </main>
  );
};
export const Route = createFileRoute("/general/$year/")({
  component: Index,
});
