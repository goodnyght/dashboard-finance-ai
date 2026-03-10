import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { dashboardService } from "../services/dashboard.service.js";

const router = Router();

// All dashboard routes require authentication
router.use(requireAuth);

// GET /api/dashboard/summary
router.get("/summary", async (req, res) => {
  try {
    const user = (req as any).user;
    const { dateFrom, dateTo } = req.query as {
      dateFrom?: string;
      dateTo?: string;
    };

    const summary = await dashboardService.getSummary(
      user.organizationId,
      dateFrom,
      dateTo
    );
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard summary" });
  }
});

// GET /api/dashboard/cash-flow
router.get("/cash-flow", async (req, res) => {
  try {
    const user = (req as any).user;
    const months = Number(req.query.months) || 6;

    const data = await dashboardService.getCashFlow(
      user.organizationId,
      months
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cash flow data" });
  }
});

// GET /api/dashboard/expense-breakdown
router.get("/expense-breakdown", async (req, res) => {
  try {
    const user = (req as any).user;
    const { dateFrom, dateTo } = req.query as {
      dateFrom?: string;
      dateTo?: string;
    };

    const data = await dashboardService.getExpenseBreakdown(
      user.organizationId,
      dateFrom,
      dateTo
    );
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch expense breakdown" });
  }
});

// GET /api/dashboard/recent-transactions
router.get("/recent-transactions", async (req, res) => {
  try {
    const user = (req as any).user;
    const limit = Number(req.query.limit) || 5;

    const data = await dashboardService.getRecentTransactions(
      user.organizationId,
      limit
    );
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch recent transactions" });
  }
});

export default router;
