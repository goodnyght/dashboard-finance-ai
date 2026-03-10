import { z } from "zod";

export const listTransactionsSchema = z.object({
    query: z.object({
        page: z.string().optional().transform((val) => (val ? Number(val) : 1)),
        limit: z.string().optional().transform((val) => (val ? Number(val) : 10)),
        dateFrom: z.string().optional(),
        dateTo: z.string().optional(),
        category: z.string().optional(),
        type: z.enum(["income", "expense"]).optional(),
        status: z.enum(["pending", "approved", "rejected"]).optional(),
        search: z.string().optional(),
    }),
});

export const getTransactionSchema = z.object({
    params: z.object({
        id: z.string().uuid(),
    }),
});

export const createTransactionSchema = z.object({
    body: z.object({
        date: z.string(),
        description: z.string().min(1),
        categoryId: z.string().uuid().optional(),
        departmentId: z.string().uuid().optional(),
        amount: z.number().positive(),
        type: z.enum(["income", "expense"]),
        reference: z.string().optional(),
        payee: z.string().optional(),
    }),
});

export const updateTransactionSchema = z.object({
    params: z.object({
        id: z.string().uuid(),
    }),
    body: z.object({
        date: z.string().optional(),
        description: z.string().min(1).optional(),
        categoryId: z.string().uuid().optional(),
        departmentId: z.string().uuid().optional(),
        amount: z.number().positive().optional(),
        type: z.enum(["income", "expense"]).optional(),
        reference: z.string().optional(),
        payee: z.string().optional(),
    }),
});

export const updateTransactionStatusSchema = z.object({
    params: z.object({
        id: z.string().uuid(),
    }),
    body: z.object({
        status: z.enum(["approved", "rejected"]),
    }),
});
