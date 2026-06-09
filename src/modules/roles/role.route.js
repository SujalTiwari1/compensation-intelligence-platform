import { Router } from "express";

import {
  getRole,
  getRoleById,
  createRole,
  deleteRole,
} from "./role.controller.js";

import { validate } from "../../middleware/validate.middleware.js";

import { createRoleSchema , idParamSchema} from "./role.validation.js";

const router = Router();

router.get("/", getRole);

router.get("/:id", validate(idParamSchema, "params"), getRoleById);

router.post("/", validate(createRoleSchema), createRole);

router.delete("/:id", deleteRole);

export default router;
