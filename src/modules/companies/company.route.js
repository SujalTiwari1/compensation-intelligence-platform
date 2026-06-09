import { Router } from "express";

import {
  getCompanies,
  getCompanyById,
  createCompany,
  deleteCompany,
} from "./company.controller.js";

import { validate } from "../../middleware/validate.middleware.js";

import { createCompanySchema , idParamSchema} from "./company.validation.js";

const router = Router();

router.get("/", getCompanies);

router.get("/:id", validate(idParamSchema, "params"), getCompanyById);

router.post("/", validate(createCompanySchema), createCompany);

router.delete("/:id", deleteCompany);

export default router;
