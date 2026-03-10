import { db } from "../db/index.js";
import { transaction } from "../db/schema.js";
import { eq, and, sql, gte, lte, desc } from "drizzle-orm";

export const dashboardService = {
  async getSummary(
    organizationId: string,
    dateFrom?: string,
    dateTo?: string
  ) {
    const conditions = [
      eq(transaction.organizationId, organizationId),
      eq(transaction.status, "approved"),
    ];
    if (dateFrom) conditions.push(gte(transaction.date, dateFrom));
    if (dateTo) conditions.push(lte(transaction.date, dateTo));

    const result = await db
      .select({
        type: transaction.type,
        total: sql<number>`COALESCE(SUM(${transaction.amount}), 0)`,
      })
      .from(transaction)
      .where(and(...conditions))
      .groupBy(transaction.type);

    let income = 0;
    let expense = 0;
    for (const row of result) {
      if (row.type === "income") income = Number(row.total);
      if (row.type === "expense") expense = Number(row.total);
    }

    const netProfit = income - expense;
    const profitMargin = income > 0 ? (netProfit / income) * 100 : 0;

    return {
      income,
      expense,
      netProfit,
      profitMargin: Math.round(profitMargin * 10) / 10,
    };
  },

  async getCashFlow(organizationId: string, months: number = 6) {
    const result = await db
      .select({
        month: sql<string>`TO_CHAR(${transaction.date}::date, 'YYYY-MM')`,
        type: transaction.type,
        total: sql<number>`COALESCE(SUM(${transaction.amount}), 0)`,
      })
      .from(transaction)
      .where(
        and(
          eq(transaction.organizationId, organizationId),
          eq(transaction.status, "approved"),
          gte(
            transaction.date,
            sql`(CURRENT_DATE - INTERVAL '${sql.raw(String(months))} months')::date`
          )
        )
      )
      .groupBy(
        sql`TO_CHAR(${transaction.date}::date, 'YYYY-MM')`,
        transaction.type
      )
      .orderBy(sql`TO_CHAR(${transaction.date}::date, 'YYYY-MM')`);

    // Pivot into { month, income, expense } format
    const monthMap = new Map<
      string,
      { month: string; income: number; expense: number }
    >();

    for (const row of result) {
      if (!monthMap.has(row.month)) {
        monthMap.set(row.month, { month: row.month, income: 0, expense: 0 });
      }
      const entry = monthMap.get(row.month)!;
      if (row.type === "income") entry.income = Number(row.total);
      if (row.type === "expense") entry.expense = Number(row.total);
    }

    return Array.from(monthMap.values());
  },

  async getExpenseBreakdown(
    organizationId: string,
    dateFrom?: string,
    dateTo?: string
  ) {
    const conditions = [
      eq(transaction.organizationId, organizationId),
      eq(transaction.status, "approved"),
      eq(transaction.type, "expense"),
    ];
    if (dateFrom) conditions.push(gte(transaction.date, dateFrom));
    if (dateTo) conditions.push(lte(transaction.date, dateTo));

    const result = await db
      .select({
        categoryId: transaction.categoryId,
        total: sql<number>`COALESCE(SUM(${transaction.amount}), 0)`,
      })
      .from(transaction)
      .where(and(...conditions))
      .groupBy(transaction.categoryId);

    return result.map((r) => ({
      categoryId: r.categoryId,
      total: Number(r.total),
    }));
  },

  async getRecentTransactions(organizationId: string, limit: number = 5) {
    return db
      .select()
      .from(transaction)
      .where(eq(transaction.organizationId, organizationId))
      .orderBy(desc(transaction.date), desc(transaction.createdAt))
      .limit(limit);
  },
};
