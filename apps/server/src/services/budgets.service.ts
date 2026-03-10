import { db } from "../db/index.js";
import {
  budget,
  budgetThreshold,
  transaction,
  department,
} from "../db/schema.js";
import { eq, and, sql } from "drizzle-orm";

export const budgetsService = {
  async list(organizationId: string, period?: string) {
    const conditions = [eq(budget.organizationId, organizationId)];
    if (period) conditions.push(eq(budget.period, period));

    return db
      .select()
      .from(budget)
      .where(and(...conditions));
  },

  async create(data: {
    departmentId: string;
    label: string;
    budgetAmount: number;
    period: string;
    organizationId: string;
  }) {
    const result = await db.insert(budget).values(data).returning();
    return result[0];
  },

  async update(
    id: string,
    organizationId: string,
    data: Partial<{
      label: string;
      budgetAmount: number;
      period: string;
    }>
  ) {
    const result = await db
      .update(budget)
      .set(data)
      .where(
        and(eq(budget.id, id), eq(budget.organizationId, organizationId))
      )
      .returning();
    return result[0] || null;
  },

  async delete(id: string, organizationId: string) {
    const result = await db
      .delete(budget)
      .where(
        and(eq(budget.id, id), eq(budget.organizationId, organizationId))
      )
      .returning();
    return result[0] || null;
  },

  async getBudgetVsActual(organizationId: string, period: string) {
    // Get all budgets for the period
    const budgets = await db
      .select({
        budgetId: budget.id,
        departmentId: budget.departmentId,
        label: budget.label,
        budgetAmount: budget.budgetAmount,
      })
      .from(budget)
      .where(
        and(
          eq(budget.organizationId, organizationId),
          eq(budget.period, period)
        )
      );

    // Get actual spending per department
    const actuals = await db
      .select({
        departmentId: transaction.departmentId,
        actualAmount: sql<number>`COALESCE(SUM(${transaction.amount}), 0)`,
      })
      .from(transaction)
      .where(
        and(
          eq(transaction.organizationId, organizationId),
          eq(transaction.type, "expense"),
          eq(transaction.status, "approved")
        )
      )
      .groupBy(transaction.departmentId);

    const actualMap = new Map(
      actuals.map((a) => [a.departmentId, Number(a.actualAmount)])
    );

    return budgets.map((b) => ({
      ...b,
      budgetAmount: Number(b.budgetAmount),
      actualAmount: actualMap.get(b.departmentId) || 0,
    }));
  },

  async getForecast(organizationId: string) {
    // Returns monthly aggregated data for forecasting
    const result = await db
      .select({
        month: sql<string>`TO_CHAR(${transaction.date}::date, 'YYYY-MM')`,
        income: sql<number>`COALESCE(SUM(CASE WHEN ${transaction.type} = 'income' THEN ${transaction.amount} ELSE 0 END), 0)`,
        expense: sql<number>`COALESCE(SUM(CASE WHEN ${transaction.type} = 'expense' THEN ${transaction.amount} ELSE 0 END), 0)`,
      })
      .from(transaction)
      .where(
        and(
          eq(transaction.organizationId, organizationId),
          eq(transaction.status, "approved")
        )
      )
      .groupBy(sql`TO_CHAR(${transaction.date}::date, 'YYYY-MM')`)
      .orderBy(sql`TO_CHAR(${transaction.date}::date, 'YYYY-MM')`);

    return result.map((r) => ({
      month: r.month,
      income: Number(r.income),
      expense: Number(r.expense),
      net: Number(r.income) - Number(r.expense),
    }));
  },

  async getThresholds(organizationId: string) {
    const result = await db
      .select()
      .from(budgetThreshold)
      .where(eq(budgetThreshold.organizationId, organizationId))
      .limit(1);

    return result[0] || { criticalPct: 90, warningPct: 75 };
  },

  async updateThresholds(
    organizationId: string,
    data: { criticalPct: number; warningPct: number }
  ) {
    // Upsert
    const existing = await db
      .select()
      .from(budgetThreshold)
      .where(eq(budgetThreshold.organizationId, organizationId))
      .limit(1);

    if (existing.length > 0) {
      const result = await db
        .update(budgetThreshold)
        .set(data)
        .where(eq(budgetThreshold.organizationId, organizationId))
        .returning();
      return result[0];
    } else {
      const result = await db
        .insert(budgetThreshold)
        .values({ organizationId, ...data })
        .returning();
      return result[0];
    }
  },
};
