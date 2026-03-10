import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";

export const useDashboardSummary = (dateFrom?: string, dateTo?: string) => {
  return useQuery({
    queryKey: ["dashboard-summary", dateFrom, dateTo],
    queryFn: () => dashboardService.getSummary(dateFrom, dateTo),
  });
};

export const useCashFlow = (months: number = 6) => {
  return useQuery({
    queryKey: ["cash-flow", months],
    queryFn: () => dashboardService.getCashFlow(months),
  });
};

export const useExpenseBreakdown = (dateFrom?: string, dateTo?: string) => {
  return useQuery({
    queryKey: ["expense-breakdown", dateFrom, dateTo],
    queryFn: () => dashboardService.getExpenseBreakdown(dateFrom, dateTo),
  });
};

export const useRecentTransactions = (limit: number = 5) => {
  return useQuery({
    queryKey: ["recent-transactions", limit],
    queryFn: () => dashboardService.getRecentTransactions(limit),
  });
};
