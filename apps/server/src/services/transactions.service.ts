import { db } from "../db/index.js";
import { transaction, category, department } from "../db/schema.js";
import { eq, and, sql, desc, ilike, gte, lte, count } from "drizzle-orm";
import { budgetsService } from "./budgets.service.js";

interface ListTransactionsParams {
  organizationId: string;
  page?: number;
  limit?: number;
  dateFrom?: string;
  dateTo?: string;
  categoryId?: string;
  type?: "income" | "expense";
  status?: "pending" | "approved" | "rejected";
  search?: string;
}

export const transactionsService = {
  async list(params: ListTransactionsParams) {
    const {
      organizationId,
      page = 1,
      limit = 10,
      dateFrom,
      dateTo,
      categoryId,
      type,
      status,
      search,
    } = params;

    const conditions = [eq(transaction.organizationId, organizationId)];

    if (dateFrom) conditions.push(gte(transaction.date, dateFrom));
    if (dateTo) conditions.push(lte(transaction.date, dateTo));
    if (categoryId) conditions.push(eq(transaction.categoryId, categoryId));
    if (type) conditions.push(eq(transaction.type, type));
    if (status) conditions.push(eq(transaction.status, status));
    if (search)
      conditions.push(ilike(transaction.description, `%${search}%`));

    const where = and(...conditions);

    const [data, total] = await Promise.all([
      db
        .select()
        .from(transaction)
        .where(where)
        .orderBy(desc(transaction.date), desc(transaction.createdAt))
        .limit(limit)
        .offset((page - 1) * limit),
      db.select({ count: count() }).from(transaction).where(where),
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

  async getById(id: string, organizationId: string) {
    const result = await db
      .select()
      .from(transaction)
      .where(
        and(
          eq(transaction.id, id),
          eq(transaction.organizationId, organizationId)
        )
      )
      .limit(1);

    return result[0] || null;
  },

  async create(data: {
    displayId: string;
    date: string;
    description: string;
    categoryId?: string;
    departmentId?: string;
    amount: number;
    type: "income" | "expense";
    reference?: string;
    payee?: string;
    createdBy: string;
    organizationId: string;
  }) {
    const result = await db
      .insert(transaction)
      .values({
        displayId: data.displayId,
        date: data.date,
        description: data.description,
        categoryId: data.categoryId,
        departmentId: data.departmentId,
        amount: data.amount,
        type: data.type,
        status: "pending",
        reference: data.reference,
        payee: data.payee,
        createdBy: data.createdBy,
        organizationId: data.organizationId,
      })
      .returning();

    const tx = result[0];

    // Trigger budget check if it's an expense and has a department
    if (tx.type === "expense" && tx.departmentId) {
      const alert = await budgetsService.checkBudgetAlerts(
        tx.organizationId,
        tx.departmentId,
        tx.date
      );
      if (alert) {
        console.log(
          `[Budget Alert] ${alert.level.toUpperCase()}: Department ${tx.departmentId} is at ${alert.usagePct.toFixed(2)}% of budget for ${alert.period}`
        );
      }
    }

    return tx;
  },

  async update(
    id: string,
    organizationId: string,
    data: Partial<{
      date: string;
      description: string;
      categoryId: string;
      departmentId: string;
      amount: number;
      type: "income" | "expense";
      reference: string;
      payee: string;
    }>
  ) {
    const result = await db
      .update(transaction)
      .set({ ...data, updatedAt: new Date() })
      .where(
        and(
          eq(transaction.id, id),
          eq(transaction.organizationId, organizationId)
        )
      )
      .returning();

    const tx = result[0];
    if (tx && tx.type === "expense" && tx.departmentId) {
      await budgetsService.checkBudgetAlerts(
        tx.organizationId,
        tx.departmentId,
        tx.date
      );
    }

    return tx || null;
  },

  async delete(id: string, organizationId: string) {
    const result = await db
      .delete(transaction)
      .where(
        and(
          eq(transaction.id, id),
          eq(transaction.organizationId, organizationId)
        )
      )
      .returning();

    return result[0] || null;
  },

  async updateStatus(
    id: string,
    organizationId: string,
    status: "approved" | "rejected",
    approvedBy: string
  ) {
    const result = await db
      .update(transaction)
      .set({ status, approvedBy, updatedAt: new Date() })
      .where(
        and(
          eq(transaction.id, id),
          eq(transaction.organizationId, organizationId)
        )
      )
      .returning();

    const tx = result[0];
    if (
      tx &&
      tx.status === "approved" &&
      tx.type === "expense" &&
      tx.departmentId
    ) {
      await budgetsService.checkBudgetAlerts(
        tx.organizationId,
        tx.departmentId,
        tx.date
      );
    }

    return tx || null;
  },

  async getSummary(organizationId: string, dateFrom?: string, dateTo?: string) {
    const conditions = [eq(transaction.organizationId, organizationId)];
    if (dateFrom) conditions.push(gte(transaction.date, dateFrom));
    if (dateTo) conditions.push(lte(transaction.date, dateTo));

    const result = await db
      .select({
        type: transaction.type,
        total: sql<number>`COALESCE(SUM(${transaction.amount}), 0)`,
      })
      .from(transaction)
      .where(and(...conditions, eq(transaction.status, "approved")))
      .groupBy(transaction.type);

    let totalInflow = 0;
    let totalOutflow = 0;

    for (const row of result) {
      if (row.type === "income") totalInflow = Number(row.total);
      if (row.type === "expense") totalOutflow = Number(row.total);
    }

    return {
      totalInflow,
      totalOutflow,
      netPosition: totalInflow - totalOutflow,
    };
  },

  async generateDisplayId(organizationId: string) {
    const result = await db
      .select({ count: count() })
      .from(transaction)
      .where(eq(transaction.organizationId, organizationId));

    const nextNum = result[0].count + 1;
    return `TRX-${String(nextNum).padStart(4, "0")}`;
  },
};
