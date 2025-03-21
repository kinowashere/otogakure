import { createFileRoute } from "@tanstack/react-router";

const Index = () => {
  return <h1>Hello, world!</h1>;
};

export const Route = createFileRoute("/")({
  component: Index,
});
