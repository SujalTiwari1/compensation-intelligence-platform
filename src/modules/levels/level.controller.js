import { levelService } from "./level.service.js";

import { asyncHandler } from "../../utils/asyncHandler.js";

import { successResponse } from "../../utils/api-response.js";

export const getLevels = asyncHandler(async (req, res) => {
  const levels = await levelService.getAllLevels();

  return successResponse(res, levels, "Levels fetched successfully");
});

export const getLevelById = asyncHandler(async (req, res) => {
  const level = await levelService.getLevelById(req.params.id);

  return successResponse(res, level, "Level fetched successfully");
});

export const createLevel = asyncHandler(async (req, res) => {
  const level = await levelService.createLevel(req.body);

  return successResponse(res, level, "Level created successfully", 201);
});

export const deleteLevel = asyncHandler(async (req, res) => {
  await levelService.deleteLevel(req.params.id);

  return successResponse(res, null, "Level deleted successfully");
});