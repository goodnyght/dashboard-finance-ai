import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index.js";
import * as schema from "../db/schema.js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "staff",
        input: false,
      },
      status: {
        type: "string",
        required: false,
        defaultValue: "active",
        input: false,
      },
      organizationId: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },
  trustedOrigins: [process.env.CORS_ORIGIN || "http://localhost:5173"],
});
