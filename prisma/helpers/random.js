export const randomBetween = (min, max) => {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  );
};

export const randomItem = (items) => {
  return items[
    Math.floor(
      Math.random() * items.length
    )
  ];
};