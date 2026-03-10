export type TransactionType = 'INCOME' | 'EXPENSE';
export type TransactionStatus = 'APPROVED' | 'PENDING' | 'REJECTED';
export type Category = 'Gaji' | 'Operasional' | 'Marketing' | 'IT & Infrastruktur' | 'Legal' | 'Pendapatan' | 'Lainnya';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: Category;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
}

export const generateMockTransactions = (): Transaction[] => {
  return [
    {
      id: "TRX-1055",
      date: "2026-03-07",
      description: "Gaji Karyawan Bulan Maret",
      category: "Gaji",
      amount: 85000000,
      type: "EXPENSE",
      status: "APPROVED"
    },
    {
      id: "TRX-1056",
      date: "2026-03-06",
      description: "Invoice #INV-202603-001 PT Maju Jaya",
      category: "Pendapatan",
      amount: 120000000,
      type: "INCOME",
      status: "APPROVED"
    },
    {
      id: "TRX-1057",
      date: "2026-03-05",
      description: "Google Ads Mar 2026",
      category: "Marketing",
      amount: 12500000,
      type: "EXPENSE",
      status: "PENDING"
    },
    {
      id: "TRX-1058",
      date: "2026-03-05",
      description: "Sewa Kantor Q1",
      category: "Operasional",
      amount: 35000000,
      type: "EXPENSE",
      status: "APPROVED"
    },
    {
      id: "TRX-1059",
      date: "2026-03-04",
      description: "Konsultan Pajak Tahunan",
      category: "Legal",
      amount: 8000000,
      type: "EXPENSE",
      status: "PENDING"
    },
    {
      id: "TRX-1060",
      date: "2026-03-03",
      description: "Peralatan Server & Lisensi",
      category: "IT & Infrastruktur",
      amount: 22000000,
      type: "EXPENSE",
      status: "APPROVED"
    },
    {
      id: "TRX-1061",
      date: "2026-03-02",
      description: "Revenue Stream B - Product Launch",
      category: "Pendapatan",
      amount: 95000000,
      type: "INCOME",
      status: "APPROVED"
    },
    {
      id: "TRX-1062",
      date: "2026-03-01",
      description: "Listrik, Air & Internet",
      category: "Operasional",
      amount: 4200000,
      type: "EXPENSE",
      status: "APPROVED"
    }
  ];
};

export const MOCK_TRANSACTIONS = generateMockTransactions();

export const formatIDR = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};
