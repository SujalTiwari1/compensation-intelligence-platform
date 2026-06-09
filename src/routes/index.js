import { Router } from "express";

import companyRoutes from "../modules/companies/company.route.js";
import roleRoutes from "../modules/roles/role.route.js";



const router = Router();

router.use("/companies", companyRoutes);
router.use("/roles", roleRoutes);

export default router;
