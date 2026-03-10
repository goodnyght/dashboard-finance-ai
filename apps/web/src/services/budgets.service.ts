import apiClient from "../lib/api-client";

export interface Budget {
    id: string;
    categoryId: string;
    categoryName: string;
    amount: number;
    period: string;
    spent: number;
    remaining: number;
    percentage: number;
}

export interface BudgetVsActual {
    category: string;
    budget: number;
    actual: number;
    variance: number;
    percentage: number;
}

export interface Thresholds {
    warning: number;
    critical: number;
}

export const budgetsService = {
    list: async (period?: string) => {
        const { data } = await apiClient.get<Budget[]>("/budgets", {
            params: { period },
        });
        return data;
    },

    getBudgetVsActual: async (period?: string) => {
        const { data } = await apiClient.get<BudgetVsActual[]>("/budgets/vs-actual", {
            params: { period },
        });
        return data;
    },

    getForecast: async () => {
        const { data } = await apiClient.get("/budgets/forecast");
        return data;
    },

    getThresholds: async () => {
        const { data } = await apiClient.get<Thresholds>("/budgets/thresholds");
        return data;
    },

    updateThresholds: async (thresholds: Thresholds) => {
        const { data } = await apiClient.put<Thresholds>("/budgets/thresholds", thresholds);
        return data;
    },

    create: async (budgetData: Partial<Budget>) => {
        const { data } = await apiClient.post<Budget>("/budgets", budgetData);
        return data;
    },

    update: async (id: string, budgetData: Partial<Budget>) => {
        const { data } = await apiClient.put<Budget>(`/budgets/${id}`, budgetData);
        return data;
    },

    delete: async (id: string) => {
        const { data } = await apiClient.delete(`/budgets/${id}`);
        return data;
    },
};
