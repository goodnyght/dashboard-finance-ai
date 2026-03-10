import React from 'react';
import DashboardOverview from '../components/DashboardOverview';

const DashboardPage: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Dashboard Overview</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back! Here's your enterprise financial summary.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-xl">calendar_month</span>
            Mar 2026
            <span className="material-symbols-outlined text-xl">arrow_drop_down</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold text-sm rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all">
            <span className="material-symbols-outlined text-xl">download</span>
            Export Report
          </button>
        </div>
      </div>
      
      <DashboardOverview />
    </div>
  );
};

export default DashboardPage;
