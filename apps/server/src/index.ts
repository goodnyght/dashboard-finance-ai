import "dotenv/config";
import express from "express";
import cors from "cors";
import apiRoutes from "./routes/index.js";

import { errorHandler } from "./middleware/error.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ── Global Middleware ──
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// ── API Routes ──
app.use("/api", apiRoutes);

// ── Error Handling ──
app.use(errorHandler);

// ── Health Check ──
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Start Server ──
app.listen(PORT, () => {
  console.log(`🚀 Finansia API server running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/health`);
  console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
