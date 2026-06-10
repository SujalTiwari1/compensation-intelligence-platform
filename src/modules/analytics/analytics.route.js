import { Router } from "express";

import { getCompanyAnalytics } from "./analytics.controller.js";

import { validate } from "../../middleware/validate.middleware.js";

import { companyAnalyticsSchema } from "./analytics.validation.js";

const router = Router();

router.get(
  "/company/:companyId",
  validate(companyAnalyticsSchema, "params"),
  getCompanyAnalytics,
);

export default router;
