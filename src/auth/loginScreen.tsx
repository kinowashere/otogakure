import { ChangeEvent, FormEvent, useState } from "react";
import { AuthKeys } from "../spotify/auth/types";
import { useAuth } from "./context";

const SpotifyKeysForm = () => {
  const { storeKeys } = useAuth();
  const [authKeysForm, setAuthKeysForm] = useState<AuthKeys>({
    spotifyClientId: "",
    spotifyClientSecret: "",
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authKeysForm) {
      storeKeys(authKeysForm);
    }
  };

  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement>,
    key: "id" | "secret",
  ) => {
    e.preventDefault();
    const value = e.target.value;

    switch (key) {
      case "id":
        setAuthKeysForm({ ...authKeysForm, spotifyClientId: value });
        break;
      case "secret":
        setAuthKeysForm({
          ...authKeysForm,
          spotifyClientSecret: value,
        });
        break;
    }
  };
  return (
    <main>
      <form className="bg-zinc-700 w-min p-4" onSubmit={onSubmit}>
        <h2>please set your spotify keys</h2>
        <section className="flex flex-col space-y-3">
          <label htmlFor="spotify_client_id">spotify client id</label>
          <input
            id="spotify_client_id"
            value={authKeysForm.spotifyClientId}
            type="text"
            className="bg-zinc-200 text-zinc-900"
            onChange={(e) => onChangeInput(e, "id")}
          />
          <label htmlFor="spotify_client_secret">spotify client secret</label>
          <input
            id="spotify_client_secret"
            value={authKeysForm.spotifyClientSecret}
            type="password"
            className="bg-zinc-200 text-zinc-900"
            onChange={(e) => onChangeInput(e, "secret")}
          />
          <button type="submit">store</button>
        </section>
      </form>
    </main>
  );
};

const SpotifyLoginButton = () => {
  const { authLink } = useAuth();

  if (!authLink) {
    return <p>well something has gone horribly, horribly wrong</p>;
  }

  return (
    <main>
      <a href={authLink} className="bg-green-700 px-2 py-1 rounded">
        login with spotify
      </a>
    </main>
  );
};

export const LoginScreen = () => {
  const { spotifyKeys, authToken, currentUserProfile } = useAuth();
  if (currentUserProfile) {
    return (
      <p>Hello, {currentUserProfile.display_name || currentUserProfile.uri}</p>
    );
  }
  if (!spotifyKeys) {
    return <SpotifyKeysForm />;
  }
  if (!authToken) {
    return <SpotifyLoginButton />;
  }
  return <>all good</>;
};
