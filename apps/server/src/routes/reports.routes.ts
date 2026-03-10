import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/rbac.js";
import { reportsService } from "../services/reports.service.js";

const router = Router();

router.use(requireAuth);

// POST /api/reports/generate
router.post(
  "/generate",
  requireRole("admin", "staff"),
  async (req, res) => {
    try {
      const user = (req as any).user;
      const { type, dateFrom, dateTo, departmentId } = req.body;

      if (!type || !dateFrom || !dateTo) {
        res
          .status(400)
          .json({ error: "type, dateFrom, and dateTo are required" });
        return;
      }

      const report = await reportsService.generate({
        organizationId: user.organizationId,
        type,
        dateFrom,
        dateTo,
        departmentId,
      });

      res.json(report);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate report" });
    }
  }
);

export default router;
