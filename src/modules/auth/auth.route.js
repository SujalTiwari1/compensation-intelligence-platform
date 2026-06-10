import { Router } from "express";

import { register, login, me } from "./auth.controller.js";

import { validate } from "../../middleware/validate.middleware.js";

import { registerSchema, loginSchema } from "./auth.validation.js";

import { authenticate } from "../../middleware/auth.middleware.js";

import { authRateLimiter } from "../../middleware/rate-limit.middleware.js";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", authRateLimiter, validate(registerSchema), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: demo1@example.com
 *               password:
 *                 type: string
 *                 example: Demo1234
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

router.post("/login", authRateLimiter, validate(loginSchema), login);

router.get("/me", authenticate, me);

export default router;
