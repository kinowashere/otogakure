export const uriToId = (uri: string) => {
  const [_spotify, _type, id] = uri.split(":");
  return id;
};
