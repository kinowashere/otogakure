export const msToTime = (ms: number) => {
  const seconds = (ms / 1000).toFixed(1);
  const minutes = (ms / (1000 * 60)).toFixed(1);
  const hours = (ms / (1000 * 60 * 60)).toFixed(1);
  const days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);

  if (Number(seconds) < 60) {
    return seconds + " Sec";
  }
  if (Number(minutes) < 60) {
    return minutes + " Min";
  }
  if (Number(hours) < 24) {
    return hours + " Hrs";
  }
  return days + " Days";
};
