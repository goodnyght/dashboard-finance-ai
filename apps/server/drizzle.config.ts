import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts", // path to your schema
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://user:password@localhost:5432/dbname",
  },
});