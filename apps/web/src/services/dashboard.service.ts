import apiClient from "../lib/api-client";
import type { Transaction } from "./transactions.service";

export interface DashboardSummary {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
  incomeChange: number;
  expenseChange: number;
  profitChange: number;
}

export interface CashFlowData {
  month: string;
  income: number;
  expense: number;
}

export interface ExpenseBreakdown {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export const dashboardService = {
  getSummary: async (dateFrom?: string, dateTo?: string) => {
    const { data } = await apiClient.get<DashboardSummary>("/dashboard/summary", {
      params: { dateFrom, dateTo },
    });
    return data;
  },

  getCashFlow: async (months: number = 6) => {
    const { data } = await apiClient.get<CashFlowData[]>("/dashboard/cash-flow", {
      params: { months },
    });
    return data;
  },

  getExpenseBreakdown: async (dateFrom?: string, dateTo?: string) => {
    const { data } = await apiClient.get<ExpenseBreakdown[]>("/dashboard/expense-breakdown", {
      params: { dateFrom, dateTo },
    });
    return data;
  },

  getRecentTransactions: async (limit: number = 5) => {
    const { data } = await apiClient.get<Transaction[]>("/dashboard/recent-transactions", {
      params: { limit },
    });
    return data;
  },
};
