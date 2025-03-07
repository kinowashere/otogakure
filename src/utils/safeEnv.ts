export const safeEnv = (key: string) => {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Missing value for env: ${key}`);
  }
  return value;
};
