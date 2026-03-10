import React from 'react';
import BudgetProgressBar from '../components/BudgetProgressBar';
import DepartmentCard from '../components/DepartmentCard';
import CashForecastChart from '../components/CashForecastChart';

const BudgetingPage: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Budgeting & Forecasting</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage departmental allocations and view cash flow predictions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-xl">calendar_month</span>
            Q1 2026
            <span className="material-symbols-outlined text-xl">arrow_drop_down</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Budget vs Actual */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-6 rounded-2xl shadow-lg shadow-black/5">
            <h3 className="text-lg font-bold text-slate-100 mb-6">Budget vs Actual (Q1)</h3>
            <div className="space-y-6">
              <BudgetProgressBar label="Gaji & Tunjangan" actualAmount={85000000} budgetAmount={85000000} />
              <BudgetProgressBar label="Operasional" actualAmount={65000000} budgetAmount={100000000} />
              <BudgetProgressBar label="Marketing" actualAmount={47500000} budgetAmount={50000000} isWarning={true} />
              <BudgetProgressBar label="IT & Infrastruktur" actualAmount={22000000} budgetAmount={40000000} />
              <BudgetProgressBar label="Legal & Compliance" actualAmount={8000000} budgetAmount={20000000} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-100 mb-4">Department Allocations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DepartmentCard name="Engineering" actualAmount={93600000} budgetAmount={120000000} />
              <DepartmentCard name="Marketing" actualAmount={47500000} budgetAmount={50000000} isWarning={true} />
              <DepartmentCard name="Operations" actualAmount={55800000} budgetAmount={90000000} />
              <DepartmentCard name="HR & Legal" actualAmount={8200000} budgetAmount={20000000} />
            </div>
          </div>
        </div>

        {/* Right Column: Forecast & Alerts */}
        <div className="space-y-8">
          <CashForecastChart />
          
          <div className="glass-card p-6 rounded-2xl shadow-lg shadow-black/5">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">settings</span>
              <h3 className="text-lg font-bold text-slate-100">Alert Thresholds</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="size-3 rounded-full bg-rose-500"></span>
                  <span className="text-sm font-medium text-slate-300">Critical (&gt;%)</span>
                </div>
                <input type="number" defaultValue={90} className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-right text-slate-100 outline-none focus:border-primary" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="size-3 rounded-full bg-amber-500"></span>
                  <span className="text-sm font-medium text-slate-300">Warning (&gt;%)</span>
                </div>
                <input type="number" defaultValue={75} className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-right text-slate-100 outline-none focus:border-primary" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="size-3 rounded-full bg-emerald-500"></span>
                  <span className="text-sm font-medium text-slate-300">Normal</span>
                </div>
                <span className="text-sm text-slate-500 italic">Below 75%</span>
              </div>
            </div>
            
            <button className="mt-6 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm rounded-lg transition-colors border border-slate-700">
              Save Thresholds
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetingPage;
