import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/rbac.js";
import { settingsService } from "../services/settings.service.js";
import { auditLogsService } from "../services/audit-logs.service.js";

const router = Router();

router.use(requireAuth);

// ── Organization Profile ──

// GET /api/settings/organization
router.get("/organization", requireRole("admin"), async (req, res) => {
  try {
    const user = (req as any).user;
    const data = await settingsService.getOrganization(
      user.organizationId
    );
    if (!data) {
      res.status(404).json({ error: "Organization not found" });
      return;
    }
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch organization settings" });
  }
});

// PUT /api/settings/organization
router.put("/organization", requireRole("admin"), async (req, res) => {
  try {
    const user = (req as any).user;
    const data = await settingsService.updateOrganization(
      user.organizationId,
      req.body
    );

    if (!data) {
      res.status(404).json({ error: "Organization not found" });
      return;
    }

    await auditLogsService.create({
      userId: user.id,
      action: "updated",
      entityType: "settings",
      details: "Updated organization settings",
      organizationId: user.organizationId,
    });

    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update organization settings" });
  }
});

// ── Notifications ──

// GET /api/settings/notifications
router.get("/notifications", async (req, res) => {
  try {
    const user = (req as any).user;
    const data = await settingsService.getNotifications(
      user.organizationId
    );
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch notification settings" });
  }
});

// PUT /api/settings/notifications
router.put(
  "/notifications",
  requireRole("admin"),
  async (req, res) => {
    try {
      const user = (req as any).user;
      const data = await settingsService.updateNotifications(
        user.organizationId,
        req.body
      );
      res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to update notification settings" });
    }
  }
);

// ── Integrations ──

// GET /api/settings/integrations
router.get("/integrations", requireRole("admin"), async (req, res) => {
  try {
    const user = (req as any).user;
    const data = await settingsService.listIntegrations(
      user.organizationId
    );
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch integrations" });
  }
});

// POST /api/settings/integrations/:provider/connect
router.post(
  "/integrations/:provider/connect",
  requireRole("admin"),
  async (req, res) => {
    try {
      const user = (req as any).user;
      const data = await settingsService.connectIntegration(
        user.organizationId,
        req.params.provider as string
      );
      res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to connect integration" });
    }
  }
);

// DELETE /api/settings/integrations/:provider/disconnect
router.delete(
  "/integrations/:provider/disconnect",
  requireRole("admin"),
  async (req, res) => {
    try {
      const user = (req as any).user;
      const data = await settingsService.disconnectIntegration(
        user.organizationId,
        req.params.provider as string
      );

      if (!data) {
        res.status(404).json({ error: "Integration not found" });
        return;
      }

      res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to disconnect integration" });
    }
  }
);

export default router;
