import { db } from "../db/index.js";
import { category } from "../db/schema.js";
import { eq, and } from "drizzle-orm";

export const categoriesService = {
  async list(organizationId: string) {
    return db
      .select()
      .from(category)
      .where(eq(category.organizationId, organizationId));
  },

  async create(data: {
    name: string;
    type: "income" | "expense";
    icon?: string;
    organizationId: string;
  }) {
    const result = await db.insert(category).values(data).returning();
    return result[0];
  },

  async update(
    id: string,
    organizationId: string,
    data: Partial<{ name: string; type: "income" | "expense"; icon: string }>
  ) {
    const result = await db
      .update(category)
      .set(data)
      .where(
        and(
          eq(category.id, id),
          eq(category.organizationId, organizationId)
        )
      )
      .returning();
    return result[0] || null;
  },

  async delete(id: string, organizationId: string) {
    const result = await db
      .delete(category)
      .where(
        and(
          eq(category.id, id),
          eq(category.organizationId, organizationId)
        )
      )
      .returning();
    return result[0] || null;
  },
};
