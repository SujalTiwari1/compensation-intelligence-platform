export const calculateMedian = (numbers) => {
  if (!numbers.length) {
    return 0;
  }

  const middle = Math.floor(numbers.length / 2);

  if (numbers.length % 2 === 0) {
    return (numbers[middle - 1] + numbers[middle]) / 2;
  }

  return numbers[middle];
};
