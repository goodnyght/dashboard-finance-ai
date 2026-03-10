import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/rbac.js";
import { departmentsService } from "../services/departments.service.js";

const router = Router();

router.use(requireAuth);

// GET /api/departments
router.get("/", async (req, res) => {
  try {
    const user = (req as any).user;
    const data = await departmentsService.list(user.organizationId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch departments" });
  }
});

// POST /api/departments
router.post("/", requireRole("admin"), async (req, res) => {
  try {
    const user = (req as any).user;
    const data = await departmentsService.create({
      ...req.body,
      organizationId: user.organizationId,
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to create department" });
  }
});

// PUT /api/departments/:id
router.put("/:id", requireRole("admin"), async (req, res) => {
  try {
    const user = (req as any).user;
    const data = await departmentsService.update(
      req.params.id as string,
      user.organizationId,
      req.body
    );
    if (!data) {
      res.status(404).json({ error: "Department not found" });
      return;
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to update department" });
  }
});

// DELETE /api/departments/:id
router.delete("/:id", requireRole("admin"), async (req, res) => {
  try {
    const user = (req as any).user;
    const data = await departmentsService.delete(
      req.params.id as string,
      user.organizationId
    );
    if (!data) {
      res.status(404).json({ error: "Department not found" });
      return;
    }
    res.json({ message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete department" });
  }
});

export default router;
