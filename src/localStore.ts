export const getFromStore = <T>(key: string) => {
  const fromStore = localStorage.getItem(key);
  if (!fromStore) {
    return null;
  }
  return JSON.parse(fromStore) as T;
};

export const setInStore = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const deleteFromStore = (key: string) => {
  localStorage.removeItem(key);
};
