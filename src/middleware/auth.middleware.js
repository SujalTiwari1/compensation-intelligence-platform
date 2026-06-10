import { ApiError } from "../utils/api-error.js";

import {
  verifyAccessToken,
} from "../utils/jwt.js";

export const authenticate =
  (req, res, next) => {

    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return next(
        new ApiError(
          401,
          "Unauthorized"
        )
      );
    }

    const token =
      authHeader.split(" ")[1];

    try {

      const decoded =
        verifyAccessToken(token);

      req.user = decoded;

      next();

    } catch {

      next(
        new ApiError(
          401,
          "Invalid token"
        )
      );
    }
  };