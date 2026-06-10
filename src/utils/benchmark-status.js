export const getBenchmarkStatus = (
  percentageDifference
) => {

  if (percentageDifference <= -10) {
    return "UNDERPAID";
  }

  if (percentageDifference >= 10) {
    return "OVERPAID";
  }

  return "FAIRLY_PAID";
};