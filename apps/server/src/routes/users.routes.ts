import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/rbac.js";
import { usersService } from "../services/users.service.js";
import { auditLogsService } from "../services/audit-logs.service.js";

const router = Router();

router.use(requireAuth);

// GET /api/users
router.get("/", requireRole("admin"), async (req, res) => {
  try {
    const user = (req as any).user;
    const { search } = req.query as { search?: string };
    const data = await usersService.list(user.organizationId, search);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// PUT /api/users/:id/role
router.put(
  "/:id/role",
  requireRole("admin"),
  async (req, res) => {
    try {
      const currentUser = (req as any).user;
      const { role } = req.body as {
        role: "admin" | "staff" | "viewer";
      };

      if (!["admin", "staff", "viewer"].includes(role)) {
        res
          .status(400)
          .json({ error: "Role must be 'admin', 'staff', or 'viewer'" });
        return;
      }

      const data = await usersService.updateRole(
        req.params.id as string,
        currentUser.organizationId,
        role
      );

      if (!data) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      await auditLogsService.create({
        userId: currentUser.id,
        action: "updated",
        entityType: "user",
        entityId: req.params.id as string,
        details: `Changed user role to ${role}`,
        organizationId: currentUser.organizationId,
      });

      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user role" });
    }
  }
);

// DELETE /api/users/:id
router.delete("/:id", requireRole("admin"), async (req, res) => {
  try {
    const currentUser = (req as any).user;

    if ((req.params.id as string) === currentUser.id) {
      res.status(400).json({ error: "Cannot remove yourself" });
      return;
    }

    const data = await usersService.remove(
      req.params.id as string,
      currentUser.organizationId
    );

    if (!data) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    await auditLogsService.create({
      userId: currentUser.id,
      action: "deleted",
      entityType: "user",
      entityId: req.params.id as string,
      details: `Removed user from organization`,
      organizationId: currentUser.organizationId,
    });

    res.json({ message: "User removed from organization" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove user" });
  }
});

export default router;
