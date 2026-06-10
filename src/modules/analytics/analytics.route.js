import { Router } from "express";

import { getCompanyAnalytics } from "./analytics.controller.js";

import { validate } from "../../middleware/validate.middleware.js";

import { companyAnalyticsSchema , companyComparisonSchema } from "./analytics.validation.js";

import { benchmarkSchema } from "./analytics.validation.js";

import { getBenchmark , compareCompanies } from "./analytics.controller.js";

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

router.get(
  "/compare",

  validate(companyComparisonSchema, "query"),

  compareCompanies,
);

export default router;
