export const sleep = (timeout_in_ms: number) =>
  new Promise((res) => {
    setTimeout(() => res(null), timeout_in_ms);
  });
