import { asyncHandler } from "../../utils/asyncHandler.js";

import { authService } from "./auth.service.js";

import { successResponse } from "../../utils/api-response.js";

export const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);

  return successResponse(res, result, "User registered successfully", 201);
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  return successResponse(res, result, "Login successful");
});

export const me = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);

  return successResponse(res, user, "User fetched successfully");
});
