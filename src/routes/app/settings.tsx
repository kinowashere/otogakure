import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../auth/context";

const RouteComponent = () => {
  const { logout } = useAuth();
  return (
    <main className="flex flex-col space-y-3">
      <h1>Settings</h1>
      <section>
        <h2>General</h2>
        <button
          type="button"
          onClick={logout}
          className="bg-red-700 text-zinc-200 cursor-pointer px-4 py-1"
        >
          logout
        </button>
      </section>
    </main>
  );
};

export const Route = createFileRoute("/app/settings")({
  component: RouteComponent,
});
