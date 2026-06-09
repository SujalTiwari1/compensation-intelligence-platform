import { locationRepository } from "./location.repository.js";
import { ApiError } from "../../utils/api-error.js";

export const locationService = {
  getAllLocations: async () => {
    return locationRepository.findAll();
  },

  getLocationById: async (id) => {
    const location =
      await locationRepository.findById(
        Number(id)
      );

    if (!location) {
      throw new ApiError(
        404,
        "Location not found"
      );
    }

    return location;
  },

  createLocation: async (payload) => {
    const city =
      payload.city.trim();

    const country =
      payload.country.trim();

    const existingLocation =
      await locationRepository.findByCityAndCountry(
        city,
        country
      );

    if (existingLocation) {
      throw new ApiError(
        409,
        "Location already exists"
      );
    }

    return locationRepository.create({
      city,
      country,
    });
  },

  deleteLocation: async (id) => {
    await locationService.getLocationById(id);

    return locationRepository.delete(
      Number(id)
    );
  },
};