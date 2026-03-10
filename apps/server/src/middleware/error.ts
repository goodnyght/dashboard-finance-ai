import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export interface AppError extends Error {
    statusCode?: number;
}

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(`[Error] ${err.stack || err.message}`);

    // Handle Zod Validation Errors
    if (err instanceof ZodError) {
        return res.status(400).json({
            error: "Validation Error",
            details: err.flatten().fieldErrors,
        });
    }

    // Handle Custom Errors (with statusCode)
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? "Internal Server Error" : err.message;

    return res.status(statusCode).json({
        error: message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};
