import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/rbac.js";
import { validate } from "../middleware/validation.js";
import { transactionsService } from "../services/transactions.service.js";
import { auditLogsService } from "../services/audit-logs.service.js";
import {
  listTransactionsSchema,
  getTransactionSchema,
  createTransactionSchema,
  updateTransactionSchema,
  updateTransactionStatusSchema,
} from "./transactions.schema.js";

const router = Router();

router.use(requireAuth);

// GET /api/transactions
router.get("/", validate(listTransactionsSchema), async (req, res) => {
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
  } = req.query as any;

  const result = await transactionsService.list({
    organizationId: user.organizationId,
    page: page || 1,
    limit: limit || 10,
    dateFrom,
    dateTo,
    categoryId: category,
    type,
    status,
    search,
  });

  res.json(result);
});

// GET /api/transactions/summary
router.get("/summary", async (req, res) => {
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
});

// GET /api/transactions/:id
router.get("/:id", validate(getTransactionSchema), async (req, res) => {
  const user = (req as any).user;
  const tx = await transactionsService.getById(
    req.params.id,
    user.organizationId
  );

  if (!tx) {
    res.status(404).json({ error: "Transaction not found" });
    return;
  }

  res.json(tx);
});

// POST /api/transactions
router.post(
  "/",
  requireRole("admin", "staff"),
  validate(createTransactionSchema),
  async (req, res) => {
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
  }
);

// PUT /api/transactions/:id
router.put(
  "/:id",
  requireRole("admin", "staff"),
  validate(updateTransactionSchema),
  async (req, res) => {
    const user = (req as any).user;
    const tx = await transactionsService.update(
      req.params.id,
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
  }
);

// DELETE /api/transactions/:id
router.delete("/:id", requireRole("admin"), validate(getTransactionSchema), async (req, res) => {
  const user = (req as any).user;
  const tx = await transactionsService.delete(
    req.params.id,
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
});

// PATCH /api/transactions/:id/status
router.patch(
  "/:id/status",
  requireRole("admin"),
  validate(updateTransactionStatusSchema),
  async (req, res) => {
    const user = (req as any).user;
    const { status } = req.body;

    const tx = await transactionsService.updateStatus(
      req.params.id,
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
  }
);

export default router;

export default router;
