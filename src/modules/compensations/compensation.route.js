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

/**
 * @swagger
 * /compensations:
 *   post:
 *     summary: Create compensation submission
 *     tags: [Compensations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyId
 *               - roleId
 *               - levelId
 *               - locationId
 *               - baseSalary
 *             properties:
 *               companyId:
 *                 type: integer
 *                 example: 1
 *               roleId:
 *                 type: integer
 *                 example: 1
 *               levelId:
 *                 type: integer
 *                 example: 4
 *               locationId:
 *                 type: integer
 *                 example: 1
 *               baseSalary:
 *                 type: number
 *                 example: 2500000
 *               bonus:
 *                 type: number
 *                 example: 300000
 *               stock:
 *                 type: number
 *                 example: 500000
 *     responses:
 *       201:
 *         description: Compensation submitted successfully
 */

router.post(
  "/",
  authenticate,
  validate(createCompensationSchema),
  createSubmission,
);

router.get("/", authenticate, getMySubmissions);

router.get("/:id", getSubmissionById);

export default router;
