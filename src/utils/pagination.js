export const getPagination = (
  page = 1,
  limit = 10
) => {

  page = Math.max(
    1,
    Number(page)
  );

  limit = Math.min(
    100,
    Math.max(
      1,
      Number(limit)
    )
  );

  return {
    skip: (page - 1) * limit,
    take: limit,
  };
};