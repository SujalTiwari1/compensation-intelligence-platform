import { Router } from "express";

import { register, login, me } from "./auth.controller.js";

import { validate } from "../../middleware/validate.middleware.js";

import { registerSchema, loginSchema } from "./auth.validation.js";

import { authenticate } from "../../middleware/auth.middleware.js";

import { authRateLimiter } from "../../middleware/rate-limit.middleware.js";

const router = Router();

router.post("/register", authRateLimiter, validate(registerSchema), register);

router.post("/login", authRateLimiter, validate(loginSchema), login);

router.get("/me", authenticate, me);

export default router;
