import { roleService } from "./role.service.js";

import { asyncHandler } from "../../utils/asyncHandler.js";

import { successResponse } from "../../utils/api-response.js";

export const getRole = asyncHandler(async (req, res) => {
  const roles = await roleService.getAllRoles();

  return successResponse(res, roles, "Roles fetched successfully");
});

export const getRoleById = asyncHandler(async (req, res) => {
  const role = await roleService.getRoleById(req.params.id);

  return successResponse(res, role, "Roles fetched successfully");
});

export const createRole = asyncHandler(async (req, res) => {
  const role = await roleService.createRoles(req.body);

  return successResponse(res, role, "Roles created successfully", 201);
});

export const deleteRole = asyncHandler(async (req, res) => {
  await roleService.deleteRole(req.params.id);

  return successResponse(res, null, "Roles deleted successfully");
});
