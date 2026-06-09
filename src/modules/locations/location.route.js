import { Router } from "express";

import {
  getLocations,
  getLocationById,
  createLocation,
  deleteLocation,
} from "./location.controller.js";

import { validate } from "../../middleware/validate.middleware.js";

import {
  createLocationSchema,
  idParamSchema,
} from "./location.validation.js";

const router = Router();

router.get("/", getLocations);

router.get(
  "/:id",
  validate(idParamSchema, "params"),
  getLocationById
);

router.post(
  "/",
  validate(createLocationSchema),
  createLocation
);

router.delete(
  "/:id",
  validate(idParamSchema, "params"),
  deleteLocation
);

export default router;