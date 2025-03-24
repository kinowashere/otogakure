import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../auth/context";
import { useEffect } from "react";

const RouteComponent = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/app/settings" });
    }
  }, [isAuthenticated]);
  return null;
};

export const Route = createFileRoute("/auth/callback")({
  component: RouteComponent,
  validateSearch: (search) => {
    return { code: (search?.code as string) || "" };
  },
  loaderDeps: ({ search: { code } }) => ({ code }),
  loader: ({ deps: { code }, context }) => {
    context.auth?.fetchAuthToken(code);
    return {};
  },
});
