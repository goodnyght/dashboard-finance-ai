import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesService } from "../services/categories.service";
import type { Category } from "../services/categories.service";

export const useCategories = (type?: "income" | "expense") => {
    return useQuery({
        queryKey: ["categories", type],
        queryFn: () => categoriesService.list(type),
    });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<Category>) => categoriesService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Category> }) =>
            categoriesService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => categoriesService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};
