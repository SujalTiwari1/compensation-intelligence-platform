export const errorMiddleware = (
  err,
  req,
  res,
  _next
) => {

  console.error(err);

  return res.status(err.statusCode || 500).json({
    success: false,
    message:
      err.message || "Internal Server Error",
  });
};