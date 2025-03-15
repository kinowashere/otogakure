import { Link, type ReactNode } from "@tanstack/react-router";

const Header = () => {
  return (
    <header>
      <nav className="flex space-x-2">
        <Link
          to="/general/$year"
          params={{ year: "all" }}
          className="font-black text-sm font-mono"
        >
          🎵 - otogakure
        </Link>
      </nav>
    </header>
  );
};

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex flex-col space-y-2 p-1 w-full md:w-[900px] md:p-4">
      <Header />
      {children}
    </section>
  );
};
