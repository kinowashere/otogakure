import { createFileRoute } from "@tanstack/react-router";
import { LoginScreen } from "../auth/loginScreen";

const Index = () => {
  return (
    <>
      <h1 className="text-amber-50 italic">Welcome!</h1>
      <LoginScreen />
    </>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
