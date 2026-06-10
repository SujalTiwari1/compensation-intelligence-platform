import { Router } from "express";

import { getCompanyAnalytics } from "./analytics.controller.js";

import { validate } from "../../middleware/validate.middleware.js";

import { companyAnalyticsSchema } from "./analytics.validation.js";

import { benchmarkSchema } from "./analytics.validation.js";

import { getBenchmark } from "./analytics.controller.js";

const router = Router();

router.get(
  "/company/:companyId",
  validate(companyAnalyticsSchema, "params"),
  getCompanyAnalytics,
);

router.get(
  "/benchmark",

  validate(benchmarkSchema, "query"),

  getBenchmark,
);

export default router;
