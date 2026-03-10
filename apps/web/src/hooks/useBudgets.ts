import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetsService } from "../services/budgets.service";
import type { Budget, Thresholds } from "../services/budgets.service";

export const useBudgets = (period?: string) => {
    return useQuery({
        queryKey: ["budgets", period],
        queryFn: () => budgetsService.list(period),
    });
};

export const useBudgetVsActual = (period?: string) => {
    return useQuery({
        queryKey: ["budgets-vs-actual", period],
        queryFn: () => budgetsService.getBudgetVsActual(period),
    });
};

export const useBudgetForecast = () => {
    return useQuery({
        queryKey: ["budgets-forecast"],
        queryFn: () => budgetsService.getForecast(),
    });
};

export const useBudgetThresholds = () => {
    return useQuery({
        queryKey: ["budgets-thresholds"],
        queryFn: () => budgetsService.getThresholds(),
    });
};

export const useUpdateBudgetThresholds = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (thresholds: Thresholds) => budgetsService.updateThresholds(thresholds),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["budgets-thresholds"] });
        },
    });
};

export const useCreateBudget = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<Budget>) => budgetsService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["budgets"] });
        },
    });
};

export const useUpdateBudget = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Budget> }) =>
            budgetsService.update(id, data),
        onSuccess: (updatedBudget) => {
            queryClient.invalidateQueries({ queryKey: ["budgets"] });
        },
    });
};

export const useDeleteBudget = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => budgetsService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["budgets"] });
        },
    });
};
