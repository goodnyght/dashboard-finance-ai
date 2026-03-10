import { Router } from "express";
import authRoutes from "./auth.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import transactionsRoutes from "./transactions.routes.js";
import budgetsRoutes from "./budgets.routes.js";
import categoriesRoutes from "./categories.routes.js";
import departmentsRoutes from "./departments.routes.js";
import usersRoutes from "./users.routes.js";
import reportsRoutes from "./reports.routes.js";
import settingsRoutes from "./settings.routes.js";
import auditLogsRoutes from "./audit-logs.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/transactions", transactionsRoutes);
router.use("/budgets", budgetsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/departments", departmentsRoutes);
router.use("/users", usersRoutes);
router.use("/reports", reportsRoutes);
router.use("/settings", settingsRoutes);
router.use("/audit-logs", auditLogsRoutes);

export default router;
