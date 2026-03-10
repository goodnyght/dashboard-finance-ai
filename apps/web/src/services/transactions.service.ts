import apiClient from "../lib/api-client";

export interface Transaction {
  id: string;
  displayId: string;
  amount: number;
  type: "income" | "expense";
  category: {
    id: string;
    name: string;
    color: string;
  };
  description: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  paymentMethod: string;
  reference: string;
}

export interface TransactionListResponse {
  data: Transaction[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface TransactionFilters {
  page?: number;
  limit?: number;
  dateFrom?: string;
  dateTo?: string;
  category?: string;
  type?: "income" | "expense";
  status?: "pending" | "approved" | "rejected";
  search?: string;
}

export const transactionsService = {
  list: async (filters: TransactionFilters = {}) => {
    const { data } = await apiClient.get<TransactionListResponse>("/transactions", {
      params: filters,
    });
    return data;
  },

  getSummary: async (dateFrom?: string, dateTo?: string) => {
    const { data } = await apiClient.get("/transactions/summary", {
      params: { dateFrom, dateTo },
    });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<Transaction>(`/transactions/${id}`);
    return data;
  },

  create: async (transactionData: Partial<Transaction>) => {
    const { data } = await apiClient.post<Transaction>("/transactions", transactionData);
    return data;
  },

  update: async (id: string, transactionData: Partial<Transaction>) => {
    const { data } = await apiClient.put<Transaction>(`/transactions/${id}`, transactionData);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await apiClient.delete(`/transactions/${id}`);
    return data;
  },

  updateStatus: async (id: string, status: "approved" | "rejected") => {
    const { data } = await apiClient.patch<Transaction>(`/transactions/${id}/status`, { status });
    return data;
  },
};
