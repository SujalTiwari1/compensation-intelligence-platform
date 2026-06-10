import { Router } from "express";

import {
  createSubmission,
  getSubmissionById,
  getMySubmissions,
} from "./compensation.controller.js";

import { validate } from "../../middleware/validate.middleware.js";

import { createCompensationSchema } from "./compensation.validation.js";

const router = Router();

router.post("/", validate(createCompensationSchema), createSubmission);

router.get("/", getMySubmissions);

router.get("/:id", getSubmissionById);

export default router;
