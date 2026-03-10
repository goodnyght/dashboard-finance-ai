import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/rbac.js";
import { auditLogsService } from "../services/audit-logs.service.js";

const router = Router();

router.use(requireAuth);

// GET /api/audit-logs
router.get("/", requireRole("admin"), async (req, res) => {
  try {
    const user = (req as any).user;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const data = await auditLogsService.list(
      user.organizationId,
      page,
      limit
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch audit logs" });
  }
});

export default router;
