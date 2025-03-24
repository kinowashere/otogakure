import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useAuth } from "../auth/context";
import { getImage } from "../spotify/utils";
import { UserCircle } from "../common/icons/UserCircle";

type UserIconProps = {
  className: string;
};

const UserIcon = ({ className }: UserIconProps) => {
  const { currentUserProfile } = useAuth();
  const iconUrl = getImage(currentUserProfile?.images || [], "smallest");
  switch (iconUrl) {
    case null:
      return <UserCircle className={className} />;
    default:
      return <img src={iconUrl.url} className={className} />;
  }
};

const Header = () => {
  return (
    <header className="py-4 flex justify-between">
      <Link to="/app" className="flex space-x-4 items-center">
        <img src="/favicon.svg" className="w-8 h-8" />
        <p>otogakure</p>
      </Link>
      <Link to="/app/settings">
        <UserIcon className="w-8 h-8 rounded" />
      </Link>
    </header>
  );
};

const RouteComponent = () => {
  return (
    <div className="flex flex-col space-y-3 min-w-[900px]">
      <Header />
      <Outlet />
    </div>
  );
};

export const Route = createFileRoute("/app")({
  component: RouteComponent,
});
