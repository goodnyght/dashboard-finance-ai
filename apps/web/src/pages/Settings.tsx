import React, { useState } from 'react';

type SettingsTab = 'GENERAL' | 'CATEGORIES' | 'INTEGRATIONS' | 'NOTIFICATIONS';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('GENERAL');

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Settings</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Configure your corporate account, categories, and connected apps.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('GENERAL')}
          className={`whitespace-nowrap px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'GENERAL' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          General
        </button>
        <button 
          onClick={() => setActiveTab('CATEGORIES')}
          className={`whitespace-nowrap px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'CATEGORIES' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          Categories
        </button>
        <button 
          onClick={() => setActiveTab('INTEGRATIONS')}
          className={`whitespace-nowrap px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'INTEGRATIONS' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          Integrations
        </button>
        <button 
          onClick={() => setActiveTab('NOTIFICATIONS')}
          className={`whitespace-nowrap px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'NOTIFICATIONS' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          Notifications
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-2 max-w-4xl">
        {activeTab === 'GENERAL' && (
          <div className="glass-card p-6 md:p-8 rounded-2xl shadow-lg shadow-black/5 animate-in fade-in zoom-in-95 duration-300 space-y-6 lg:w-2/3">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-6 border-b border-slate-200/50 dark:border-slate-800/50 pb-4">
               <span className="material-symbols-outlined text-primary">corporate_fare</span>
               Corporate Profile
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 md:items-center">
                 <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Nama Perusahaan</label>
                 <input type="text" defaultValue="PT Maju Bersama Sejahtera" className="md:col-span-2 w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary text-slate-900 dark:text-slate-100" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 md:items-center">
                 <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Mata Uang Default</label>
                 <div className="md:col-span-2 relative">
                    <select className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm appearance-none outline-none focus:border-primary text-slate-900 dark:text-slate-100">
                      <option>IDR - Indonesian Rupiah (Rp)</option>
                      <option>USD - US Dollar ($)</option>
                      <option>SGD - Singapore Dollar (S$)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 md:items-center">
                 <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Tahun Fiskal</label>
                 <div className="md:col-span-2 relative">
                    <select className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm appearance-none outline-none focus:border-primary text-slate-900 dark:text-slate-100">
                      <option>Januari - Desember</option>
                      <option>April - Maret</option>
                      <option>Juli - Juni</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 md:items-center">
                 <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Format Tanggal</label>
                 <div className="md:col-span-2 relative">
                    <select className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm appearance-none outline-none focus:border-primary text-slate-900 dark:text-slate-100">
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 md:items-center">
                 <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Zona Waktu</label>
                 <div className="md:col-span-2 relative">
                    <select className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm appearance-none outline-none focus:border-primary text-slate-900 dark:text-slate-100">
                      <option>Asia/Jakarta (WIB)</option>
                      <option>Asia/Makassar (WITA)</option>
                      <option>Asia/Jayapura (WIT)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                  </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200/50 dark:border-slate-800/50 flex justify-end">
               <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold text-sm rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all">
                  <span className="material-symbols-outlined text-lg">save</span>
                  Simpan Perubahan
               </button>
            </div>
          </div>
        )}

        {activeTab === 'CATEGORIES' && (
          <div className="animate-in fade-in zoom-in-95 duration-300 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-100">Chart of Accounts (COA)</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined text-xl">add</span>
                Kategori Baru
              </button>
            </div>

            <div className="glass-card rounded-2xl shadow-lg shadow-black/5 overflow-hidden border border-slate-200/50 dark:border-slate-800/50">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="px-6 py-4 font-medium rounded-tl-lg">Nama Kategori</th>
                    <th className="px-6 py-4 font-medium">Tipe</th>
                    <th className="px-6 py-4 font-medium text-right rounded-tr-lg">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-900 dark:text-slate-100">
                  {['Operasional', 'Gaji', 'Marketing', 'IT & Infrastruktur', 'Legal'].map((cat) => (
                    <tr key={cat} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                      <td className="px-6 py-4 font-bold">{cat}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full bg-rose-500/10 text-rose-500">
                          Expense
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="text-slate-400 hover:text-primary transition-colors p-1"><span className="material-symbols-outlined text-sm">edit</span></button>
                          <button className="text-slate-400 hover:text-rose-500 transition-colors p-1"><span className="material-symbols-outlined text-sm">delete</span></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4 font-bold">Pendapatan</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-500">
                        Income
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="text-slate-400 hover:text-primary transition-colors p-1"><span className="material-symbols-outlined text-sm">edit</span></button>
                          <button className="text-slate-400 hover:text-rose-500 transition-colors p-1"><span className="material-symbols-outlined text-sm">delete</span></button>
                        </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'INTEGRATIONS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="glass-card p-6 rounded-2xl border border-primary/30 flex items-start gap-4">
              <div className="size-12 rounded bg-white shrink-0 flex items-center justify-center p-2 border border-slate-200">
                 {/* BCA Mock Logo */}
                 <div className="font-black text-blue-900 italic leading-none">BCA</div>
              </div>
              <div className="flex-1">
                 <div className="flex items-center justify-between mb-1">
                   <h4 className="font-bold text-slate-100">Bank BCA</h4>
                   <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">Connected</span>
                 </div>
                 <p className="text-xs text-slate-400 mb-4 line-clamp-2">Auto-sync daily transactions from corporate account ending in 1042.</p>
                 <button className="text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors">Disconnect</button>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex items-start gap-4 hover:border-slate-600 transition-colors">
              <div className="size-12 rounded bg-white shrink-0 flex items-center justify-center border border-slate-200">
                 {/* Mandiri Mock Logo */}
                 <div className="font-black text-amber-500 lowercase leading-none">mandiri</div>
              </div>
              <div className="flex-1">
                 <div className="flex items-center justify-between mb-1">
                   <h4 className="font-bold text-slate-100">Bank Mandiri</h4>
                 </div>
                 <p className="text-xs text-slate-400 mb-4 line-clamp-2">Connect your Mandiri corporate account for automated transaction reconciliation.</p>
                 <button className="text-xs font-bold text-primary hover:underline transition-colors">Connect Bank</button>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex items-start gap-4 hover:border-slate-600 transition-colors">
              <div className="size-12 rounded bg-slate-800 shrink-0 flex items-center justify-center border border-slate-700">
                 <span className="material-symbols-outlined text-green-400">payments</span>
              </div>
              <div className="flex-1">
                 <div className="flex items-center justify-between mb-1">
                   <h4 className="font-bold text-slate-100">Payroll System</h4>
                 </div>
                 <p className="text-xs text-slate-400 mb-4 line-clamp-2">Integrate with HRIS to automatically record monthly employee salaries.</p>
                 <button className="text-xs font-bold text-primary hover:underline transition-colors">Configure API</button>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 border-dashed flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-slate-300 hover:border-slate-500 transition-all cursor-pointer min-h-[140px]">
               <span className="material-symbols-outlined text-3xl">add_circle</span>
               <span className="text-sm font-bold">Browse App Directory</span>
            </div>
          </div>
        )}

        {activeTab === 'NOTIFICATIONS' && (
           <div className="glass-card p-6 md:p-8 rounded-2xl shadow-lg shadow-black/5 animate-in fade-in zoom-in-95 duration-300 space-y-8 lg:w-2/3">
             <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 border-b border-slate-200/50 dark:border-slate-800/50 pb-4">
                  <span className="material-symbols-outlined text-slate-400">mail</span>
                  Email Notifications
                </h3>

                <label className="flex items-start justify-between cursor-pointer group hover:bg-slate-50/5 dark:hover:bg-slate-800/50 p-2 -mx-2 rounded transition-colors">
                  <div className="leading-tight group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                    <span className="font-bold block mb-1">Approval Requests</span>
                    <span className="text-sm text-slate-500">Email me when a transaction requires my approval</span>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
                  </div>
                </label>
                
                <label className="flex items-start justify-between cursor-pointer group hover:bg-slate-50/5 dark:hover:bg-slate-800/50 p-2 -mx-2 rounded transition-colors">
                  <div className="leading-tight group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                    <span className="font-bold block mb-1">Budget Alerts</span>
                    <span className="text-sm text-slate-500">Notify when department budgets exceed warning thresholds</span>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
                  </div>
                </label>

                <label className="flex items-start justify-between cursor-pointer group hover:bg-slate-50/5 dark:hover:bg-slate-800/50 p-2 -mx-2 rounded transition-colors">
                  <div className="leading-tight group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                    <span className="font-bold block mb-1">Weekly Summary</span>
                    <span className="text-sm text-slate-500">Receive a weekly digest of financial activities</span>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300 dark:bg-slate-700 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"></span>
                  </div>
                </label>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
