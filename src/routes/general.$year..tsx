import { createFileRoute, useRouterState } from "@tanstack/react-router";

const Index = () => {
  const params = useRouterState();
  console.log(params);
  return <div>Welcome home!</div>;
};
export const Route = createFileRoute("/general/$year/")({
  component: Index,
});
