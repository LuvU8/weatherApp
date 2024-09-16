export const roundValue = (value: number | null | undefined): number | null => {
  if (value === undefined || value === null) {
    return null;
  }
  return Math.round(value);
};
