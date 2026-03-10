import React from 'react';

const TransactionFilterBar: React.FC = () => {
  return (
    <div className="glass-card p-4 rounded-xl flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
        <span className="material-symbols-outlined text-slate-400 text-lg">calendar_today</span>
        <select className="bg-transparent border-none p-0 text-sm focus:ring-0 cursor-pointer pr-8 outline-none dark:text-slate-100">
          <option>Last 30 Days</option>
          <option>Current Quarter</option>
          <option>Fiscal Year 2024</option>
          <option>Custom Range</option>
        </select>
      </div>
      <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
        <span className="material-symbols-outlined text-slate-400 text-lg">category</span>
        <select className="bg-transparent border-none p-0 text-sm focus:ring-0 cursor-pointer pr-8 outline-none dark:text-slate-100">
          <option>All Categories</option>
          <option>Operations</option>
          <option>Marketing</option>
          <option>Salaries</option>
          <option>Infrastructure</option>
        </select>
      </div>
      <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
        <span className="material-symbols-outlined text-slate-400 text-lg">filter_list</span>
        <select className="bg-transparent border-none p-0 text-sm focus:ring-0 cursor-pointer pr-8 outline-none dark:text-slate-100">
          <option>All Types</option>
          <option>Income</option>
          <option>Expense</option>
        </select>
      </div>
      <div className="flex-1 min-w-[200px] relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
        <input className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm outline-none dark:text-slate-100 focus:ring-1 focus:ring-primary/30" placeholder="Search in content..." type="text"/>
      </div>
    </div>
  );
};

export default TransactionFilterBar;
