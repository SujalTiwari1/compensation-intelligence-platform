import { levelRepository } from "./level.repository.js";
import { ApiError } from "../../utils/api-error.js";

export const levelService = {
  getAllLevels: async (pagination) => {
    return levelRepository.findAll(pagination);
  },

  getLevelById: async (id) => {
    const level = await levelRepository.findById(Number(id));

    if (!level) {
      throw new ApiError(404, "Level not found");
    }

    return level;
  },

  createLevel: async (payload) => {
    const normalizedName = payload.name.trim();

    const existingLevel =
      await levelRepository.findByName(normalizedName);

    if (existingLevel) {
      throw new ApiError(
        409,
        "Level already exists"
      );
    }

    return levelRepository.create({
      name: normalizedName,
    });
  },

  deleteLevel: async (id) => {
    await levelService.getLevelById(id);

    return levelRepository.delete(Number(id));
  },
};