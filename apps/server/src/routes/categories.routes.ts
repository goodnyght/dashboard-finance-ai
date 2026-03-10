import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/rbac.js";
import { categoriesService } from "../services/categories.service.js";

const router = Router();

router.use(requireAuth);

// GET /api/categories
router.get("/", async (req, res) => {
  try {
    const user = (req as any).user;
    const data = await categoriesService.list(user.organizationId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// POST /api/categories
router.post("/", requireRole("admin"), async (req, res) => {
  try {
    const user = (req as any).user;
    const data = await categoriesService.create({
      ...req.body,
      organizationId: user.organizationId,
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
});

// PUT /api/categories/:id
router.put("/:id", requireRole("admin"), async (req, res) => {
  try {
    const user = (req as any).user;
    const data = await categoriesService.update(
      req.params.id as string,
      user.organizationId,
      req.body
    );
    if (!data) {
      res.status(404).json({ error: "Category not found" });
      return;
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to update category" });
  }
});

// DELETE /api/categories/:id
router.delete("/:id", requireRole("admin"), async (req, res) => {
  try {
    const user = (req as any).user;
    const data = await categoriesService.delete(
      req.params.id as string,
      user.organizationId
    );
    if (!data) {
      res.status(404).json({ error: "Category not found" });
      return;
    }
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
});

export default router;
