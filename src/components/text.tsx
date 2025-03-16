import type { ReactNode } from "@tanstack/react-router";

export const H1 = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-sm font-black font-mono">{children}</h1>;
};
