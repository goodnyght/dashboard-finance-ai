import React, { useState } from 'react';
import { useGenerateReport } from '../hooks/useReports';

const ReportsPage: React.FC = () => {
  const [type, setType] = useState('Monthly Profit & Loss');
  const [dateFrom, setDateFrom] = useState('2026-01-01');
  const [dateTo, setDateTo] = useState('2026-03-31');
  const [departmentId, setDepartmentId] = useState('');

  const generateReport = useGenerateReport();

  const handleGenerate = async () => {
    try {
      const report = await generateReport.mutateAsync({
        type,
        dateFrom,
        dateTo,
        departmentId: departmentId || undefined,
      });
      alert(`Report generated: ${report.id}. Status: ${report.status}`);
    } catch (error) {
      alert('Failed to generate report');
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Reports & Export</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Generate, preview, and export financial statements and analysis.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Report Generator Form */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass-card p-6 rounded-2xl shadow-lg shadow-black/5">
            <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">tune</span>
              Report Generator
            </h3>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Tipe Laporan</label>
                <div className="relative">
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm appearance-none outline-none focus:border-primary text-slate-900 dark:text-slate-100"
                  >
                    <option value="Monthly Profit & Loss">Monthly Profit & Loss</option>
                    <option value="Cash Flow Statement">Cash Flow Statement</option>
                    <option value="Balance Sheet">Balance Sheet</option>
                    <option value="Expense Breakdown">Expense Breakdown</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Periode</label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">calendar_month</span>
                    <input 
                      type="date" 
                      value={dateFrom} 
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:border-primary text-slate-900 dark:text-slate-100" 
                    />
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">calendar_month</span>
                    <input 
                      type="date" 
                      value={dateTo} 
                      onChange={(e) => setDateTo(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:border-primary text-slate-900 dark:text-slate-100" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Departemen</label>
                <div className="relative">
                  <select 
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm appearance-none outline-none focus:border-primary text-slate-900 dark:text-slate-100"
                  >
                    <option value="">Semua Departemen</option>
                    <option value="engineering">Engineering</option>
                    <option value="marketing">Marketing</option>
                    <option value="operations">Operations</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="button" 
                  onClick={handleGenerate}
                  disabled={generateReport.isPending}
                  className="w-full flex justify-center items-center gap-2 py-3 bg-primary text-white font-bold text-sm rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-xl">
                    {generateReport.isPending ? 'sync' : 'insert_chart'}
                  </span>
                  {generateReport.isPending ? 'Generating...' : 'Generate Report'}
                </button>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl shadow-lg shadow-black/5">
            <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-500">schedule</span>
              Scheduled Reports
            </h3>
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-start">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="size-5 border-2 border-slate-400 dark:border-slate-600 rounded bg-transparent peer-checked:bg-primary peer-checked:border-primary transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[14px] opacity-0 peer-checked:opacity-100">check</span>
                  </div>
                </div>
                <div className="leading-tight group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                  <span className="font-bold block mb-0.5">Auto-generate Monthly P&L</span>
                  <span className="text-xs text-slate-500">Setiap tanggal 1</span>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-start">
                  <input type="checkbox" className="peer sr-only" defaultChecked />
                  <div className="size-5 border-2 border-slate-400 dark:border-slate-600 rounded bg-transparent peer-checked:bg-primary peer-checked:border-primary transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[14px] opacity-0 peer-checked:opacity-100">check</span>
                  </div>
                </div>
                <div className="leading-tight group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                  <span className="font-bold block mb-0.5">Auto-generate Cash Flow</span>
                  <span className="text-xs text-slate-500">Setiap tanggal 1</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Preview Panel */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="glass-card flex-1 rounded-2xl shadow-lg shadow-black/5 p-8 border hover:border-slate-200 dark:border-slate-800 transition-colors">
            
            <div className="border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-950 p-8 md:p-12 rounded-xl shadow-inner mx-auto max-w-3xl font-mono text-sm">
              <div className="text-center mb-10 border-b-2 border-slate-800 dark:border-slate-200 pb-6">
                 <h1 className="text-xl md:text-2xl font-black tracking-widest uppercase text-slate-900 dark:text-slate-100">Laporan Laba Rugi (P&L)</h1>
                 <p className="text-slate-500 mt-2">Periode: {dateFrom} - {dateTo}</p>
              </div>

              <div className="space-y-8">
                {/* Pendapatan */}
                <div>
                  <h3 className="font-bold uppercase mb-4 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">Pendapatan</h3>
                  <div className="space-y-3 font-medium text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>Penjualan Jasa</span>
                      <span>Rp 450.000.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pendapatan Lain</span>
                      <span>Rp 35.000.000</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100 pt-3 border-t border-slate-200 dark:border-slate-800">
                      <span>Total Pendapatan</span>
                      <span>Rp 485.000.000</span>
                    </div>
                  </div>
                </div>

                {/* Beban */}
                <div>
                  <h3 className="font-bold uppercase mb-4 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">Beban</h3>
                  <div className="space-y-3 font-medium text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>Gaji & Tunjangan</span>
                      <span>Rp 255.000.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Operasional</span>
                      <span>Rp 104.200.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Marketing</span>
                      <span>Rp 47.500.000</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100 pt-3 border-t border-slate-200 dark:border-slate-800">
                      <span>Total Beban</span>
                      <span>Rp 406.700.000</span>
                    </div>
                  </div>
                </div>

                {/* Laba Bersih */}
                <div className="pt-6 border-t-[3px] border-double border-slate-800 dark:border-slate-200">
                  <div className="flex justify-between font-black text-lg md:text-xl text-primary">
                      <span>LABA BERSIH</span>
                      <span>Rp 78.300.000</span>
                    </div>
                </div>
              </div>
            </div>

          </div>

          <div className="flex gap-4 justify-end">
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined text-xl">table</span>
              Download Excel
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all">
              <span className="material-symbols-outlined text-xl">picture_as_pdf</span>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
