import apiClient from "../lib/api-client";

export interface Category {
    id: string;
    name: string;
    type: "income" | "expense";
    color: string;
    icon?: string;
}

export const categoriesService = {
    list: async (type?: "income" | "expense") => {
        const { data } = await apiClient.get<Category[]>("/categories", {
            params: { type },
        });
        return data;
    },

    create: async (categoryData: Partial<Category>) => {
        const { data } = await apiClient.post<Category>("/categories", categoryData);
        return data;
    },

    update: async (id: string, categoryData: Partial<Category>) => {
        const { data } = await apiClient.put<Category>(`/categories/${id}`, categoryData);
        return data;
    },

    delete: async (id: string) => {
        const { data } = await apiClient.delete(`/categories/${id}`);
        return data;
    },
};
