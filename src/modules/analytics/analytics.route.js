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

/**
 * @swagger
 * /analytics/company/{companyId}:
 *   get:
 *     summary: Get company analytics
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Company analytics fetched successfully
 *       404:
 *         description: Company not found
 */

router.get(
  "/company/:companyId",
  validate(companyAnalyticsSchema, "params"),
  getCompanyAnalytics,
);

/**
 * @swagger
 * /analytics/benchmark:
 *   get:
 *     summary: Benchmark a compensation against market data
 *     tags:
 *       - Analytics
 *
 *     parameters:
 *       - in: query
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: levelId
 *         required: true
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: locationId
 *         required: true
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: currentCompensation
 *         required: true
 *         schema:
 *           type: number
 *
 *     responses:
 *       200:
 *         description: Benchmark analysis completed
 */

router.get(
  "/benchmark",

  validate(benchmarkSchema, "query"),

  getBenchmark,
);

/**
 * @swagger
 * /analytics/compare:
 *   get:
 *     summary: Compare two companies compensation data
 *     tags: [Analytics]
 *     parameters:
 *       - in: query
 *         name: companyA
 *         required: true
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: companyB
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Company comparison completed
 */

router.get(
  "/compare",

  validate(companyComparisonSchema, "query"),

  compareCompanies,
);

/**
 * @swagger
 * /analytics/dashboard:
 *   get:
 *     summary: Get dashboard analytics
 *     tags: [Analytics]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Dashboard analytics fetched successfully
 */

router.get(
  "/dashboard",

  validate(dashboardSchema, "query"),

  getDashboardAnalytics,
);

export default router;
