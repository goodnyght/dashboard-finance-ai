import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/rbac.js";
import { budgetsService } from "../services/budgets.service.js";

const router = Router();

router.use(requireAuth);

// GET /api/budgets
router.get("/", async (req, res) => {
  try {
    const user = (req as any).user;
    const { period } = req.query as { period?: string };
    const data = await budgetsService.list(user.organizationId, period);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch budgets" });
  }
});

// GET /api/budgets/vs-actual
router.get("/vs-actual", async (req, res) => {
  try {
    const user = (req as any).user;
    const { period } = req.query as { period?: string };
    const data = await budgetsService.getBudgetVsActual(
      user.organizationId,
      period || "Q1-2026"
    );
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch budget vs actual data" });
  }
});

// GET /api/budgets/forecast
router.get("/forecast", async (req, res) => {
  try {
    const user = (req as any).user;
    const data = await budgetsService.getForecast(user.organizationId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch forecast data" });
  }
});

// GET /api/budgets/thresholds
router.get("/thresholds", async (req, res) => {
  try {
    const user = (req as any).user;
    const data = await budgetsService.getThresholds(user.organizationId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch thresholds" });
  }
});

// PUT /api/budgets/thresholds
router.put(
  "/thresholds",
  requireRole("admin"),
  async (req, res) => {
    try {
      const user = (req as any).user;
      const data = await budgetsService.updateThresholds(
        user.organizationId,
        req.body
      );
      res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to update thresholds" });
    }
  }
);

// POST /api/budgets
router.post("/", requireRole("admin"), async (req, res) => {
  try {
    const user = (req as any).user;
    const data = await budgetsService.create({
      ...req.body,
      organizationId: user.organizationId,
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to create budget" });
  }
});

// PUT /api/budgets/:id
router.put("/:id", requireRole("admin"), async (req, res) => {
  try {
    const user = (req as any).user;
    const data = await budgetsService.update(
      req.params.id as string,
      user.organizationId,
      req.body
    );
    if (!data) {
      res.status(404).json({ error: "Budget not found" });
      return;
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to update budget" });
  }
});

// DELETE /api/budgets/:id
router.delete("/:id", requireRole("admin"), async (req, res) => {
  try {
    const user = (req as any).user;
    const data = await budgetsService.delete(
      req.params.id as string,
      user.organizationId
    );
    if (!data) {
      res.status(404).json({ error: "Budget not found" });
      return;
    }
    res.json({ message: "Budget deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete budget" });
  }
});

export default router;
