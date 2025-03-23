import { ChangeEvent, FormEvent, HTMLInputTypeAttribute } from "react";
import { AuthKeys } from "../spotify/auth/types";
import { useAuth } from "./context";
import { useForm } from "@tanstack/react-form";

type InputProps = {
  labelText: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: HTMLInputTypeAttribute;
  errors: string | null;
};
const Input = ({ labelText, value, onChange, type, errors }: InputProps) => {
  return (
    <label>
      <p className="text-sm">{labelText}</p>
      <input
        value={value}
        type={type}
        className="bg-zinc-200 text-zinc-900"
        onChange={onChange}
      />
      {errors && (
        <p className="text-xs font-black bg-red-900 text-zinc-200 p-1">
          {errors}
        </p>
      )}
    </label>
  );
};

const SpotifyKeysForm = () => {
  const { storeKeys } = useAuth();
  const defaultValues: AuthKeys = {
    spotifyClientId: "",
    spotifyClientSecret: "",
  };
  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: (res) => {
        const fields: Record<string, string> = {};
        Object.keys(res.value).forEach((key) => {
          if (!res.value[key as keyof AuthKeys]) {
            fields[key] = `${key} cannot be empty`;
          }
        });

        return { fields };
      },
    },
    onSubmit: (res) => {
      storeKeys(res.value);
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <main>
      <form
        className="bg-green-200 border-green-900 border-2 w-min px-12 py-6"
        onSubmit={onSubmit}
      >
        <p className="text-2xl font-black text-green-900">
          set your spotify keys
        </p>
        <a
          href="https://developer.spotify.com/dashboard/"
          className="underline text-sm italic"
        >
          go to spotify dashboard
        </a>
        <section className="flex flex-col space-y-4 mt-8">
          <form.Field name="spotifyClientId">
            {(subField) => {
              return (
                <Input
                  onChange={(e) => subField.handleChange(e.target.value)}
                  labelText="Spotify Client ID"
                  value={subField.state.value}
                  type="text"
                  errors={subField.state.meta.errors.join(", ")}
                />
              );
            }}
          </form.Field>
          <form.Field name="spotifyClientSecret">
            {(subField) => {
              return (
                <Input
                  onChange={(e) => subField.handleChange(e.target.value)}
                  labelText="Spotify Client Secret"
                  value={subField.state.value}
                  type="password"
                  errors={subField.state.meta.errors.join(", ")}
                />
              );
            }}
          </form.Field>
          <button
            type="submit"
            className="bg-green-700 px-5 py-2 text-zinc-200 cursor-pointer"
          >
            save
          </button>
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
      <a
        href={authLink}
        className="bg-green-600 text-zinc-200 px-2 py-1 rounded"
      >
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
