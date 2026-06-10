import { Router } from "express";

import {
  createSubmission,
  getSubmissionById,
  getMySubmissions,
} from "./compensation.controller.js";

import { validate } from "../../middleware/validate.middleware.js";

import { createCompensationSchema } from "./compensation.validation.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(createCompensationSchema),
  createSubmission,
);

router.get("/", authenticate, getMySubmissions);

router.get("/:id", getSubmissionById);

export default router;
