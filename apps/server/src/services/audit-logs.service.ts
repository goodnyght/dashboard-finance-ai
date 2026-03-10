import { db } from "../db/index.js";
import { auditLog } from "../db/schema.js";
import { eq, desc, count, and } from "drizzle-orm";

export const auditLogsService = {
  async list(
    organizationId: string,
    page: number = 1,
    limit: number = 20
  ) {
    const conditions = [eq(auditLog.organizationId, organizationId)];
    const where = and(...conditions);

    const [data, total] = await Promise.all([
      db
        .select()
        .from(auditLog)
        .where(where)
        .orderBy(desc(auditLog.createdAt))
        .limit(limit)
        .offset((page - 1) * limit),
      db.select({ count: count() }).from(auditLog).where(where),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total: total[0].count,
        totalPages: Math.ceil(total[0].count / limit),
      },
    };
  },

  async create(data: {
    userId: string;
    action: "created" | "updated" | "approved" | "rejected" | "deleted";
    entityType:
      | "transaction"
      | "budget"
      | "category"
      | "user"
      | "settings";
    entityId?: string;
    details?: string;
    organizationId: string;
  }) {
    const result = await db.insert(auditLog).values(data).returning();
    return result[0];
  },
};
