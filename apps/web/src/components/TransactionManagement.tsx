import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import TransactionFilterBar from './TransactionFilterBar';
import TransactionTable from './TransactionTable';
import TransactionSummaryWidgets from './TransactionSummaryWidgets';

const TransactionManagement: React.FC = () => {
  return (
    <div className="flex bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-slate-50 dark:bg-slate-950/50">
        <TopBar />
        <div className="p-8 space-y-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Transaction Management</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time overview of enterprise cash flows and approvals.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined text-xl">upload_file</span>
                Bulk Import
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold text-sm rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all">
                <span className="material-symbols-outlined text-xl">add_circle</span>
                Add Transaction
              </button>
            </div>
          </div>
          
          <TransactionFilterBar />
          <TransactionTable />
          <TransactionSummaryWidgets />
        </div>
      </main>
    </div>
  );
};

export default TransactionManagement;
