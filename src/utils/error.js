import { ApiError } from "./api-error.js";

export const notFound = (
  message = "Resource not found"
) => {
  throw new ApiError(404, message);
};

export const conflict = (
  message = "Resource already exists"
) => {
  throw new ApiError(409, message);
};

export const badRequest = (
  message = "Bad request"
) => {
  throw new ApiError(400, message);
};