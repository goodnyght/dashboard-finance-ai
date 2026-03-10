import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../services/transactions.service";
import type { TransactionFilters, Transaction } from "../services/transactions.service";

export const useTransactions = (filters: TransactionFilters = {}) => {
  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => transactionsService.list(filters),
  });
};

export const useTransactionSummary = (dateFrom?: string, dateTo?: string) => {
  return useQuery({
    queryKey: ["transactions-summary", dateFrom, dateTo],
    queryFn: () => transactionsService.getSummary(dateFrom, dateTo),
  });
};

export const useTransaction = (id: string) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => transactionsService.getById(id),
    enabled: !!id,
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Transaction>) => transactionsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transactions-summary"] });
    },
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Transaction> }) =>
      transactionsService.update(id, data),
    onSuccess: (updatedTx) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transaction", updatedTx.id] });
      queryClient.invalidateQueries({ queryKey: ["transactions-summary"] });
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => transactionsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transactions-summary"] });
    },
  });
};

export const useUpdateTransactionStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: "approved" | "rejected" }) =>
      transactionsService.updateStatus(id, status),
    onSuccess: (updatedTx) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transaction", updatedTx.id] });
      queryClient.invalidateQueries({ queryKey: ["transactions-summary"] });
    },
  });
};
