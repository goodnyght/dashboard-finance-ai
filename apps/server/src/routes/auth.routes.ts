import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../auth/index.js";

const router = Router();

// Delegate all /api/auth/* routes to better-auth
router.use(toNodeHandler(auth));

export default router;
