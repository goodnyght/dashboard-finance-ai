import {
  pgTable,
  text,
  uuid,
  timestamp,
  bigint,
  date,
  integer,
  boolean,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

// ─── Enums ───────────────────────────────────────────────────────────────────

export const transactionTypeEnum = pgEnum("transaction_type", [
  "income",
  "expense",
]);

export const transactionStatusEnum = pgEnum("transaction_status", [
  "pending",
  "approved",
  "rejected",
]);

export const categoryTypeEnum = pgEnum("category_type", [
  "income",
  "expense",
]);

export const userRoleEnum = pgEnum("user_role", [
  "admin",
  "staff",
  "viewer",
]);

export const userStatusEnum = pgEnum("user_status", [
  "active",
  "invited",
]);

export const integrationStatusEnum = pgEnum("integration_status", [
  "connected",
  "disconnected",
]);

export const auditActionEnum = pgEnum("audit_action", [
  "created",
  "updated",
  "approved",
  "rejected",
  "deleted",
]);

export const auditEntityTypeEnum = pgEnum("audit_entity_type", [
  "transaction",
  "budget",
  "category",
  "user",
  "settings",
]);

// ─── better-auth managed tables ──────────────────────────────────────────────
// These tables are managed by better-auth but we define them here so Drizzle
// is aware of them and we can reference them in foreign keys / queries.

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),

  // ── Extended columns ──
  role: userRoleEnum("role").notNull().default("staff"),
  status: userStatusEnum("status").notNull().default("active"),
  organizationId: uuid("organization_id").references(
    () => organization.id,
    { onDelete: "set null" }
  ),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Application tables ──────────────────────────────────────────────────────

export const organization = pgTable("organization", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  defaultCurrency: text("default_currency").notNull().default("IDR"),
  fiscalYearStart: text("fiscal_year_start").notNull().default("january"),
  dateFormat: text("date_format").notNull().default("DD/MM/YYYY"),
  timezone: text("timezone").notNull().default("Asia/Jakarta"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const category = pgTable("category", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  type: categoryTypeEnum("type").notNull(),
  icon: text("icon"),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const department = pgTable("department", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const transaction = pgTable("transaction", {
  id: uuid("id").defaultRandom().primaryKey(),
  displayId: text("display_id").notNull().unique(),
  date: date("date").notNull(),
  description: text("description").notNull(),
  categoryId: uuid("category_id").references(() => category.id, {
    onDelete: "set null",
  }),
  departmentId: uuid("department_id").references(() => department.id, {
    onDelete: "set null",
  }),
  amount: bigint("amount", { mode: "number" }).notNull(),
  type: transactionTypeEnum("type").notNull(),
  status: transactionStatusEnum("status").notNull().default("pending"),
  reference: text("reference"), // e.g. Invoice #, Receipt #
  payee: text("payee"), // e.g. AWS, Gojek, Employee Name
  createdBy: text("created_by").references(() => user.id, {
    onDelete: "set null",
  }),
  approvedBy: text("approved_by").references(() => user.id, {
    onDelete: "set null",
  }),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const budget = pgTable("budget", {
  id: uuid("id").defaultRandom().primaryKey(),
  departmentId: uuid("department_id")
    .notNull()
    .references(() => department.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  budgetAmount: bigint("budget_amount", { mode: "number" }).notNull(),
  period: text("period").notNull(), // e.g. "Q1-2026"
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const budgetThreshold = pgTable("budget_threshold", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" })
    .unique(),
  criticalPct: integer("critical_pct").notNull().default(90),
  warningPct: integer("warning_pct").notNull().default(75),
});

export const auditLog = pgTable("audit_log", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => user.id, {
    onDelete: "set null",
  }),
  action: auditActionEnum("action").notNull(),
  entityType: auditEntityTypeEnum("entity_type").notNull(),
  entityId: text("entity_id"),
  details: text("details"),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const organizationSettings = pgTable("organization_settings", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" })
    .unique(),
  notifyApprovals: boolean("notify_approvals").notNull().default(true),
  notifyBudgetAlerts: boolean("notify_budget_alerts").notNull().default(true),
  notifyWeeklySummary: boolean("notify_weekly_summary")
    .notNull()
    .default(false),
  autoGenerateMonthlyPl: boolean("auto_generate_monthly_pl")
    .notNull()
    .default(false),
  autoGenerateCashFlow: boolean("auto_generate_cash_flow")
    .notNull()
    .default(true),
  autoGenerateBudgetReport: boolean("auto_generate_budget_report")
    .notNull()
    .default(false),
});

export const integration = pgTable("integration", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  provider: text("provider").notNull(), // e.g. "bca", "mandiri", "payroll"
  status: integrationStatusEnum("status").notNull().default("disconnected"),
  config: jsonb("config"),
  connectedAt: timestamp("connected_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
