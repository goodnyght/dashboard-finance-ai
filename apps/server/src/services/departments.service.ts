import { db } from "../db/index.js";
import { department } from "../db/schema.js";
import { eq, and } from "drizzle-orm";

export const departmentsService = {
  async list(organizationId: string) {
    return db
      .select()
      .from(department)
      .where(eq(department.organizationId, organizationId));
  },

  async create(data: { name: string; organizationId: string }) {
    const result = await db.insert(department).values(data).returning();
    return result[0];
  },

  async update(id: string, organizationId: string, data: { name: string }) {
    const result = await db
      .update(department)
      .set(data)
      .where(
        and(
          eq(department.id, id),
          eq(department.organizationId, organizationId)
        )
      )
      .returning();
    return result[0] || null;
  },

  async delete(id: string, organizationId: string) {
    const result = await db
      .delete(department)
      .where(
        and(
          eq(department.id, id),
          eq(department.organizationId, organizationId)
        )
      )
      .returning();
    return result[0] || null;
  },
};
