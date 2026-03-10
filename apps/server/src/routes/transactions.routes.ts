import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/rbac.js";
import { transactionsService } from "../services/transactions.service.js";
import { auditLogsService } from "../services/audit-logs.service.js";

const router = Router();

router.use(requireAuth);

// GET /api/transactions
router.get("/", async (req, res) => {
  try {
    const user = (req as any).user;
    const {
      page,
      limit,
      dateFrom,
      dateTo,
      category,
      type,
      status,
      search,
    } = req.query as Record<string, string | undefined>;

    const result = await transactionsService.list({
      organizationId: user.organizationId,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
      dateFrom,
      dateTo,
      categoryId: category,
      type: type as "income" | "expense" | undefined,
      status: status as "pending" | "approved" | "rejected" | undefined,
      search,
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// GET /api/transactions/summary
router.get("/summary", async (req, res) => {
  try {
    const user = (req as any).user;
    const { dateFrom, dateTo } = req.query as {
      dateFrom?: string;
      dateTo?: string;
    };

    const summary = await transactionsService.getSummary(
      user.organizationId,
      dateFrom,
      dateTo
    );
    res.json(summary);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch transaction summary" });
  }
});

// GET /api/transactions/:id
router.get("/:id", async (req, res) => {
  try {
    const user = (req as any).user;
    const tx = await transactionsService.getById(
      req.params.id as string,
      user.organizationId
    );

    if (!tx) {
      res.status(404).json({ error: "Transaction not found" });
      return;
    }

    res.json(tx);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transaction" });
  }
});

// POST /api/transactions
router.post("/", requireRole("admin", "staff"), async (req, res) => {
  try {
    const user = (req as any).user;
    const displayId = await transactionsService.generateDisplayId(
      user.organizationId
    );

    const tx = await transactionsService.create({
      ...req.body,
      displayId,
      createdBy: user.id,
      organizationId: user.organizationId,
    });

    await auditLogsService.create({
      userId: user.id,
      action: "created",
      entityType: "transaction",
      entityId: tx.id,
      details: `Created transaction ${displayId}`,
      organizationId: user.organizationId,
    });

    res.status(201).json(tx);
  } catch (error) {
    res.status(500).json({ error: "Failed to create transaction" });
  }
});

// PUT /api/transactions/:id
router.put("/:id", requireRole("admin", "staff"), async (req, res) => {
  try {
    const user = (req as any).user;
    const tx = await transactionsService.update(
      req.params.id as string,
      user.organizationId,
      req.body
    );

    if (!tx) {
      res.status(404).json({ error: "Transaction not found" });
      return;
    }

    await auditLogsService.create({
      userId: user.id,
      action: "updated",
      entityType: "transaction",
      entityId: tx.id,
      details: `Updated transaction ${tx.displayId}`,
      organizationId: user.organizationId,
    });

    res.json(tx);
  } catch (error) {
    res.status(500).json({ error: "Failed to update transaction" });
  }
});

// DELETE /api/transactions/:id
router.delete("/:id", requireRole("admin"), async (req, res) => {
  try {
    const user = (req as any).user;
    const tx = await transactionsService.delete(
      req.params.id as string,
      user.organizationId
    );

    if (!tx) {
      res.status(404).json({ error: "Transaction not found" });
      return;
    }

    await auditLogsService.create({
      userId: user.id,
      action: "deleted",
      entityType: "transaction",
      entityId: tx.id,
      details: `Deleted transaction ${tx.displayId}`,
      organizationId: user.organizationId,
    });

    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});

// PATCH /api/transactions/:id/status
router.patch(
  "/:id/status",
  requireRole("admin"),
  async (req, res) => {
    try {
      const user = (req as any).user;
      const { status } = req.body as {
        status: "approved" | "rejected";
      };

      if (!["approved", "rejected"].includes(status)) {
        res
          .status(400)
          .json({ error: "Status must be 'approved' or 'rejected'" });
        return;
      }

      const tx = await transactionsService.updateStatus(
        req.params.id as string,
        user.organizationId,
        status,
        user.id
      );

      if (!tx) {
        res.status(404).json({ error: "Transaction not found" });
        return;
      }

      await auditLogsService.create({
        userId: user.id,
        action: status === "approved" ? "approved" : "rejected",
        entityType: "transaction",
        entityId: tx.id,
        details: `${status === "approved" ? "Approved" : "Rejected"} transaction ${tx.displayId}`,
        organizationId: user.organizationId,
      });

      res.json(tx);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to update transaction status" });
    }
  }
);

export default router;
