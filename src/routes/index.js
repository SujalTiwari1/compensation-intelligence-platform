import { Router } from "express";

import companyRoutes from "../modules/companies/company.route.js";
import roleRoutes from "../modules/roles/role.route.js";
import levelRoutes from "../modules/levels/level.route.js";
import locationRoutes from "../modules/locations/location.route.js";
import compensationRoutes from "../modules/compensations/compensation.route.js";

const router = Router();

router.use("/companies", companyRoutes);
router.use("/roles", roleRoutes);
router.use("/levels", levelRoutes);
router.use("/locations", locationRoutes);

export default router;
