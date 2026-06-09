import { locationService } from "./location.service.js";

import { asyncHandler } from "../../utils/asyncHandler.js";

import { successResponse } from "../../utils/api-response.js";

export const getLocations = asyncHandler(
  async (req, res) => {
    const locations =
      await locationService.getAllLocations();

    return successResponse(
      res,
      locations,
      "Locations fetched successfully"
    );
  }
);

export const getLocationById = asyncHandler(
  async (req, res) => {
    const location =
      await locationService.getLocationById(
        req.params.id
      );

    return successResponse(
      res,
      location,
      "Location fetched successfully"
    );
  }
);

export const createLocation = asyncHandler(
  async (req, res) => {
    const location =
      await locationService.createLocation(
        req.body
      );

    return successResponse(
      res,
      location,
      "Location created successfully",
      201
    );
  }
);

export const deleteLocation = asyncHandler(
  async (req, res) => {
    await locationService.deleteLocation(
      req.params.id
    );

    return successResponse(
      res,
      null,
      "Location deleted successfully"
    );
  }
);