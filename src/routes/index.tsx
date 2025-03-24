import { createFileRoute } from "@tanstack/react-router";
import { LoginScreen } from "../auth/loginScreen";

const Index = () => {
  return (
    <section className="flex flex-col space-y-10` mt-10">
      <h1 className="italic">welcome to otogakure!</h1>
      <LoginScreen />
    </section>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
