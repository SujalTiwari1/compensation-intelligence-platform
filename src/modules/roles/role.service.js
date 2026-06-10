import { roleRepository } from "./role.repository.js";
import { ApiError } from "../../utils/api-error.js";

export const roleService = {
  getAllRoles: async (pagination) => {
    return roleRepository.findAll(pagination);
  },

  getRoleById: async (id) => {
    const role = await roleRepository.findById(Number(id));

    if (!role) {
      throw new ApiError(404, "Role not found");
    }

    return role;
  },

  createRole: async (payload) => {
    const existingRole = await roleRepository.findByName(payload.name);

    if (existingRole) {
      throw new ApiError(409, "Role already exists");
    }

    return roleRepository.create({
      name: payload.name,
      normalizedName: payload.name.trim().toLowerCase(),
    });
  },

  deleteRole: async (id) => {
    await roleService.getRoleById(id);

    return roleRepository.delete(Number(id));
  },
};
