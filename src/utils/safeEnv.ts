export const safeEnvFe = (key: string) => {
  console.log(import.meta.env);
  const value = import.meta.env[key];
  if (value === undefined) {
    throw new Error(`Missing value for env: ${key}`);
  }
  return value;
};
