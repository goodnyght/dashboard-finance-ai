import "dotenv/config";
import { db } from "./index.js";
import {
  organization,
  category,
  department,
  transaction,
  budget,
  budgetThreshold,
  organizationSettings,
  integration,
} from "./schema.js";

async function seed() {
  console.log("🌱 Seeding database...\n");

  // ── 1. Organization ──
  console.log("  Creating organization...");
  const [org] = await db
    .insert(organization)
    .values({
      name: "PT Maju Bersama Sejahtera",
      defaultCurrency: "IDR",
      fiscalYearStart: "january",
      dateFormat: "DD/MM/YYYY",
      timezone: "Asia/Jakarta",
    })
    .returning();

  console.log(`  ✓ Organization: ${org.name} (${org.id})\n`);

  // ── 2. Categories ──
  console.log("  Creating categories...");
  const categoryData = [
    { name: "Gaji", type: "expense" as const, icon: "group" },
    { name: "Operasional", type: "expense" as const, icon: "settings" },
    { name: "Marketing", type: "expense" as const, icon: "campaign" },
    { name: "IT & Infrastruktur", type: "expense" as const, icon: "dns" },
    { name: "Legal", type: "expense" as const, icon: "gavel" },
    { name: "Pendapatan", type: "income" as const, icon: "payments" },
    { name: "Lainnya", type: "expense" as const, icon: "more_horiz" },
  ];

  const categories = await db
    .insert(category)
    .values(categoryData.map((c) => ({ ...c, organizationId: org.id })))
    .returning();

  const catMap = new Map(categories.map((c) => [c.name, c.id]));
  console.log(`  ✓ ${categories.length} categories created\n`);

  // ── 3. Departments ──
  console.log("  Creating departments...");
  const departmentData = [
    { name: "Engineering" },
    { name: "Marketing" },
    { name: "Operations" },
    { name: "HR & Legal" },
  ];

  const departments = await db
    .insert(department)
    .values(departmentData.map((d) => ({ ...d, organizationId: org.id })))
    .returning();

  const deptMap = new Map(departments.map((d) => [d.name, d.id]));
  console.log(`  ✓ ${departments.length} departments created\n`);

  // ── 4. Transactions ──
  console.log("  Creating transactions...");
  const transactionData = [
    {
      displayId: "TRX-0001",
      date: "2026-03-07",
      description: "Gaji Karyawan Bulan Maret",
      categoryId: catMap.get("Gaji")!,
      departmentId: deptMap.get("HR & Legal")!,
      amount: 85000000,
      type: "expense" as const,
      status: "approved" as const,
    },
    {
      displayId: "TRX-0002",
      date: "2026-03-06",
      description: "Invoice #INV-202603-001 PT Maju Jaya",
      categoryId: catMap.get("Pendapatan")!,
      departmentId: deptMap.get("Operations")!,
      amount: 120000000,
      type: "income" as const,
      status: "approved" as const,
    },
    {
      displayId: "TRX-0003",
      date: "2026-03-05",
      description: "Google Ads Mar 2026",
      categoryId: catMap.get("Marketing")!,
      departmentId: deptMap.get("Marketing")!,
      amount: 12500000,
      type: "expense" as const,
      status: "pending" as const,
    },
    {
      displayId: "TRX-0004",
      date: "2026-03-05",
      description: "Sewa Kantor Q1",
      categoryId: catMap.get("Operasional")!,
      departmentId: deptMap.get("Operations")!,
      amount: 35000000,
      type: "expense" as const,
      status: "approved" as const,
    },
    {
      displayId: "TRX-0005",
      date: "2026-03-04",
      description: "Konsultan Pajak Tahunan",
      categoryId: catMap.get("Legal")!,
      departmentId: deptMap.get("HR & Legal")!,
      amount: 8000000,
      type: "expense" as const,
      status: "pending" as const,
    },
    {
      displayId: "TRX-0006",
      date: "2026-03-03",
      description: "Peralatan Server & Lisensi",
      categoryId: catMap.get("IT & Infrastruktur")!,
      departmentId: deptMap.get("Engineering")!,
      amount: 22000000,
      type: "expense" as const,
      status: "approved" as const,
    },
    {
      displayId: "TRX-0007",
      date: "2026-03-02",
      description: "Revenue Stream B - Product Launch",
      categoryId: catMap.get("Pendapatan")!,
      departmentId: deptMap.get("Operations")!,
      amount: 95000000,
      type: "income" as const,
      status: "approved" as const,
    },
    {
      displayId: "TRX-0008",
      date: "2026-03-01",
      description: "Listrik, Air & Internet",
      categoryId: catMap.get("Operasional")!,
      departmentId: deptMap.get("Operations")!,
      amount: 4200000,
      type: "expense" as const,
      status: "approved" as const,
    },
    // Additional older transactions for charts
    {
      displayId: "TRX-0009",
      date: "2026-02-15",
      description: "Gaji Karyawan Bulan Februari",
      categoryId: catMap.get("Gaji")!,
      departmentId: deptMap.get("HR & Legal")!,
      amount: 85000000,
      type: "expense" as const,
      status: "approved" as const,
    },
    {
      displayId: "TRX-0010",
      date: "2026-02-10",
      description: "Invoice Project Alpha",
      categoryId: catMap.get("Pendapatan")!,
      departmentId: deptMap.get("Engineering")!,
      amount: 200000000,
      type: "income" as const,
      status: "approved" as const,
    },
    {
      displayId: "TRX-0011",
      date: "2026-01-15",
      description: "Gaji Karyawan Bulan Januari",
      categoryId: catMap.get("Gaji")!,
      departmentId: deptMap.get("HR & Legal")!,
      amount: 85000000,
      type: "expense" as const,
      status: "approved" as const,
    },
    {
      displayId: "TRX-0012",
      date: "2026-01-10",
      description: "Contract Payment - Q1",
      categoryId: catMap.get("Pendapatan")!,
      departmentId: deptMap.get("Operations")!,
      amount: 165000000,
      type: "income" as const,
      status: "approved" as const,
    },
  ];

  const transactions = await db
    .insert(transaction)
    .values(
      transactionData.map((t) => ({
        ...t,
        organizationId: org.id,
      }))
    )
    .returning();

  console.log(`  ✓ ${transactions.length} transactions created\n`);

  // ── 5. Budgets ──
  console.log("  Creating budgets...");
  const budgetData = [
    {
      departmentId: deptMap.get("Engineering")!,
      label: "Engineering Q1",
      budgetAmount: 120000000,
      period: "Q1-2026",
    },
    {
      departmentId: deptMap.get("Marketing")!,
      label: "Marketing Q1",
      budgetAmount: 50000000,
      period: "Q1-2026",
    },
    {
      departmentId: deptMap.get("Operations")!,
      label: "Operations Q1",
      budgetAmount: 90000000,
      period: "Q1-2026",
    },
    {
      departmentId: deptMap.get("HR & Legal")!,
      label: "HR & Legal Q1",
      budgetAmount: 20000000,
      period: "Q1-2026",
    },
  ];

  const budgets = await db
    .insert(budget)
    .values(budgetData.map((b) => ({ ...b, organizationId: org.id })))
    .returning();

  console.log(`  ✓ ${budgets.length} budgets created\n`);

  // ── 6. Budget Thresholds ──
  console.log("  Creating budget thresholds...");
  await db.insert(budgetThreshold).values({
    organizationId: org.id,
    criticalPct: 90,
    warningPct: 75,
  });
  console.log("  ✓ Budget thresholds set\n");

  // ── 7. Organization Settings ──
  console.log("  Creating organization settings...");
  await db.insert(organizationSettings).values({
    organizationId: org.id,
    notifyApprovals: true,
    notifyBudgetAlerts: true,
    notifyWeeklySummary: false,
    autoGenerateMonthlyPl: false,
    autoGenerateCashFlow: true,
    autoGenerateBudgetReport: false,
  });
  console.log("  ✓ Organization settings created\n");

  // ── 8. Integrations ──
  console.log("  Creating integrations...");
  await db.insert(integration).values([
    {
      organizationId: org.id,
      provider: "bca",
      status: "connected",
      connectedAt: new Date(),
    },
    {
      organizationId: org.id,
      provider: "mandiri",
      status: "disconnected",
    },
    {
      organizationId: org.id,
      provider: "payroll",
      status: "disconnected",
    },
  ]);
  console.log("  ✓ 3 integrations created\n");

  console.log("✅ Seed complete!");
  console.log(`\n📋 Summary:`);
  console.log(`   Organization: ${org.name}`);
  console.log(`   Organization ID: ${org.id}`);
  console.log(`   Categories: ${categories.length}`);
  console.log(`   Departments: ${departments.length}`);
  console.log(`   Transactions: ${transactions.length}`);
  console.log(`   Budgets: ${budgets.length}`);
  console.log(
    `\n💡 Note: Run "npm run db:push" to push the schema to the database before seeding.`
  );

  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
