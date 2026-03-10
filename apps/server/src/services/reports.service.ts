import { db } from "../db/index.js";
import { transaction, category } from "../db/schema.js";
import { eq, and, gte, lte, sql } from "drizzle-orm";

interface ReportParams {
  organizationId: string;
  type: "profit_loss" | "cash_flow" | "balance_sheet" | "expense_breakdown";
  dateFrom: string;
  dateTo: string;
  departmentId?: string;
}

export const reportsService = {
  async generate(params: ReportParams) {
    const { organizationId, type, dateFrom, dateTo, departmentId } = params;

    const conditions = [
      eq(transaction.organizationId, organizationId),
      eq(transaction.status, "approved"),
      gte(transaction.date, dateFrom),
      lte(transaction.date, dateTo),
    ];

    if (departmentId) {
      conditions.push(eq(transaction.departmentId, departmentId));
    }

    switch (type) {
      case "profit_loss":
        return this.generateProfitLoss(conditions);
      case "cash_flow":
        return this.generateCashFlow(conditions);
      case "expense_breakdown":
        return this.generateExpenseBreakdown(conditions);
      case "balance_sheet":
        return this.generateBalanceSheet(conditions);
      default:
        throw new Error(`Unknown report type: ${type}`);
    }
  },

  async generateProfitLoss(conditions: any[]) {
    // Income grouped by category
    const incomeData = await db
      .select({
        categoryId: transaction.categoryId,
        total: sql<number>`COALESCE(SUM(${transaction.amount}), 0)`,
      })
      .from(transaction)
      .where(and(...conditions, eq(transaction.type, "income")))
      .groupBy(transaction.categoryId);

    // Expense grouped by category
    const expenseData = await db
      .select({
        categoryId: transaction.categoryId,
        total: sql<number>`COALESCE(SUM(${transaction.amount}), 0)`,
      })
      .from(transaction)
      .where(and(...conditions, eq(transaction.type, "expense")))
      .groupBy(transaction.categoryId);

    const totalIncome = incomeData.reduce(
      (sum, r) => sum + Number(r.total),
      0
    );
    const totalExpense = expenseData.reduce(
      (sum, r) => sum + Number(r.total),
      0
    );

    return {
      type: "profit_loss",
      income: incomeData.map((r) => ({
        categoryId: r.categoryId,
        total: Number(r.total),
      })),
      expense: expenseData.map((r) => ({
        categoryId: r.categoryId,
        total: Number(r.total),
      })),
      totalIncome,
      totalExpense,
      netProfit: totalIncome - totalExpense,
    };
  },

  async generateCashFlow(conditions: any[]) {
    const result = await db
      .select({
        month: sql<string>`TO_CHAR(${transaction.date}::date, 'YYYY-MM')`,
        type: transaction.type,
        total: sql<number>`COALESCE(SUM(${transaction.amount}), 0)`,
      })
      .from(transaction)
      .where(and(...conditions))
      .groupBy(
        sql`TO_CHAR(${transaction.date}::date, 'YYYY-MM')`,
        transaction.type
      )
      .orderBy(sql`TO_CHAR(${transaction.date}::date, 'YYYY-MM')`);

    const monthMap = new Map<
      string,
      { month: string; income: number; expense: number; net: number }
    >();

    for (const row of result) {
      if (!monthMap.has(row.month)) {
        monthMap.set(row.month, {
          month: row.month,
          income: 0,
          expense: 0,
          net: 0,
        });
      }
      const entry = monthMap.get(row.month)!;
      if (row.type === "income") entry.income = Number(row.total);
      if (row.type === "expense") entry.expense = Number(row.total);
      entry.net = entry.income - entry.expense;
    }

    return {
      type: "cash_flow",
      data: Array.from(monthMap.values()),
    };
  },

  async generateExpenseBreakdown(conditions: any[]) {
    const result = await db
      .select({
        categoryId: transaction.categoryId,
        total: sql<number>`COALESCE(SUM(${transaction.amount}), 0)`,
      })
      .from(transaction)
      .where(and(...conditions, eq(transaction.type, "expense")))
      .groupBy(transaction.categoryId);

    const total = result.reduce((sum, r) => sum + Number(r.total), 0);

    return {
      type: "expense_breakdown",
      data: result.map((r) => ({
        categoryId: r.categoryId,
        total: Number(r.total),
        percentage: total > 0 ? Math.round((Number(r.total) / total) * 1000) / 10 : 0,
      })),
      total,
    };
  },

  async generateBalanceSheet(conditions: any[]) {
    // Simplified balance sheet
    const result = await db
      .select({
        type: transaction.type,
        total: sql<number>`COALESCE(SUM(${transaction.amount}), 0)`,
      })
      .from(transaction)
      .where(and(...conditions))
      .groupBy(transaction.type);

    let totalAssets = 0;
    let totalLiabilities = 0;
    for (const row of result) {
      if (row.type === "income") totalAssets = Number(row.total);
      if (row.type === "expense") totalLiabilities = Number(row.total);
    }

    return {
      type: "balance_sheet",
      totalAssets,
      totalLiabilities,
      equity: totalAssets - totalLiabilities,
    };
  },
};
