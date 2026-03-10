import { db } from "../db/index.js";
import { user } from "../db/schema.js";
import { eq, and, ilike, or } from "drizzle-orm";

export const usersService = {
  async list(organizationId: string, search?: string) {
    const conditions = [eq(user.organizationId, organizationId)];

    if (search) {
      conditions.push(
        or(
          ilike(user.name, `%${search}%`),
          ilike(user.email, `%${search}%`)
        )!
      );
    }

    return db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
      })
      .from(user)
      .where(and(...conditions));
  },

  async updateRole(
    userId: string,
    organizationId: string,
    role: "admin" | "staff" | "viewer"
  ) {
    const result = await db
      .update(user)
      .set({ role, updatedAt: new Date() })
      .where(
        and(
          eq(user.id, userId),
          eq(user.organizationId, organizationId)
        )
      )
      .returning();
    return result[0] || null;
  },

  async remove(userId: string, organizationId: string) {
    // Remove from organization (don't delete the user account)
    const result = await db
      .update(user)
      .set({ organizationId: null as any, updatedAt: new Date() })
      .where(
        and(
          eq(user.id, userId),
          eq(user.organizationId, organizationId)
        )
      )
      .returning();
    return result[0] || null;
  },
};
