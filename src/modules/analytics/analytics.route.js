import { Router } from "express";

import { getCompanyAnalytics } from "./analytics.controller.js";

import { validate } from "../../middleware/validate.middleware.js";

import {
  companyAnalyticsSchema,
  companyComparisonSchema,
  benchmarkSchema,
  dashboardSchema,
} from "./analytics.validation.js";

import {
  getBenchmark,
  compareCompanies,
  getDashboardAnalytics,
} from "./analytics.controller.js";

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

router.get(
  "/dashboard",

  validate(dashboardSchema, "query"),

  getDashboardAnalytics,
);

export default router;
