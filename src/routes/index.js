import { Router } from "express";

import companyRoutes from "../modules/companies/company.route.js";

const router = Router();

router.use("/companies", companyRoutes);

export default router;
