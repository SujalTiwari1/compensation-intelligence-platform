export const isSalaryInRange = (
  totalCompensation
) => {

  const MIN_TC = 100000;

  const MAX_TC = 100000000;

  return (
    totalCompensation >= MIN_TC &&
    totalCompensation <= MAX_TC
  );
};