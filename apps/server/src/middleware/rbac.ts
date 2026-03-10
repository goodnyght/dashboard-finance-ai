import type { Request, Response, NextFunction } from "express";

type UserRole = "admin" | "staff" | "viewer";

/**
 * Middleware factory that checks if the authenticated user has one of the
 * allowed roles. Must be used AFTER requireAuth middleware.
 *
 * @example
 *   router.post("/", requireAuth, requireRole("admin", "staff"), handler);
 */
export function requireRole(...allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!allowedRoles.includes(user.role as UserRole)) {
      res.status(403).json({ error: "Forbidden: insufficient role" });
      return;
    }

    next();
  };
}
