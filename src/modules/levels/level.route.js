import { Router } from "express";

import {
  getLevels,
  getLevelById,
  createLevel,
  deleteLevel,
} from "./level.controller.js";

import { validate } from "../../middleware/validate.middleware.js";

import {
  createLevelSchema,
  idParamSchema,
} from "./level.validation.js";

const router = Router();

router.get("/", getLevels);

router.get("/:id", validate(idParamSchema, "params"), getLevelById);

router.post("/", validate(createLevelSchema), createLevel);

router.delete("/:id", validate(idParamSchema, "params"), deleteLevel);

export default router;