import { db } from "../db/index.js";
import {
  organization,
  organizationSettings,
  integration,
} from "../db/schema.js";
import { eq } from "drizzle-orm";

export const settingsService = {
  // ── Organization Profile ──

  async getOrganization(organizationId: string) {
    const result = await db
      .select()
      .from(organization)
      .where(eq(organization.id, organizationId))
      .limit(1);
    return result[0] || null;
  },

  async updateOrganization(
    organizationId: string,
    data: Partial<{
      name: string;
      defaultCurrency: string;
      fiscalYearStart: string;
      dateFormat: string;
      timezone: string;
    }>
  ) {
    const result = await db
      .update(organization)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(organization.id, organizationId))
      .returning();
    return result[0] || null;
  },

  // ── Notification Preferences ──

  async getNotifications(organizationId: string) {
    const result = await db
      .select()
      .from(organizationSettings)
      .where(eq(organizationSettings.organizationId, organizationId))
      .limit(1);

    return (
      result[0] || {
        notifyApprovals: true,
        notifyBudgetAlerts: true,
        notifyWeeklySummary: false,
        autoGenerateMonthlyPl: false,
        autoGenerateCashFlow: true,
        autoGenerateBudgetReport: false,
      }
    );
  },

  async updateNotifications(
    organizationId: string,
    data: Partial<{
      notifyApprovals: boolean;
      notifyBudgetAlerts: boolean;
      notifyWeeklySummary: boolean;
      autoGenerateMonthlyPl: boolean;
      autoGenerateCashFlow: boolean;
      autoGenerateBudgetReport: boolean;
    }>
  ) {
    const existing = await db
      .select()
      .from(organizationSettings)
      .where(eq(organizationSettings.organizationId, organizationId))
      .limit(1);

    if (existing.length > 0) {
      const result = await db
        .update(organizationSettings)
        .set(data)
        .where(eq(organizationSettings.organizationId, organizationId))
        .returning();
      return result[0];
    } else {
      const result = await db
        .insert(organizationSettings)
        .values({ organizationId, ...data })
        .returning();
      return result[0];
    }
  },

  // ── Integrations ──

  async listIntegrations(organizationId: string) {
    return db
      .select()
      .from(integration)
      .where(eq(integration.organizationId, organizationId));
  },

  async connectIntegration(organizationId: string, provider: string) {
    // Check existing
    const existing = await db
      .select()
      .from(integration)
      .where(eq(integration.organizationId, organizationId));

    const found = existing.find((i) => i.provider === provider);
    if (found) {
      const result = await db
        .update(integration)
        .set({ status: "connected", connectedAt: new Date() })
        .where(eq(integration.id, found.id))
        .returning();
      return result[0];
    } else {
      const result = await db
        .insert(integration)
        .values({
          organizationId,
          provider,
          status: "connected",
          connectedAt: new Date(),
        })
        .returning();
      return result[0];
    }
  },

  async disconnectIntegration(organizationId: string, provider: string) {
    const existing = await db
      .select()
      .from(integration)
      .where(eq(integration.organizationId, organizationId));

    const found = existing.find((i) => i.provider === provider);
    if (!found) return null;

    const result = await db
      .update(integration)
      .set({ status: "disconnected" })
      .where(eq(integration.id, found.id))
      .returning();
    return result[0];
  },
};
