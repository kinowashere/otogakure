import { createFileRoute } from "@tanstack/react-router";

const Index = () => {
  return <h1 className="text-amber-50 italic">Hello, world!</h1>;
};

export const Route = createFileRoute("/")({
  component: Index,
});
