import React from 'react';
import { useTransactionSummary } from '../hooks/useTransactions';
import { formatIDR } from '../data/mockData';

const TransactionSummaryWidgets: React.FC = () => {
  const { data: summary, isLoading } = useTransactionSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="glass-card p-6 rounded-xl animate-pulse h-32 bg-slate-800/50"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Total Outflow</p>
          <span className="material-symbols-outlined text-red-500">trending_down</span>
        </div>
        <h3 className="text-2xl font-black">{formatIDR(summary?.totalExpenses || 0)}</h3>
        <p className="text-xs text-slate-500 mt-2">
          {Math.abs(summary?.expenseChange || 0)}% {summary?.expenseChange && summary.expenseChange > 0 ? 'higher' : 'lower'} than last month
        </p>
      </div>
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Total Inflow</p>
          <span className="material-symbols-outlined text-emerald-500">trending_up</span>
        </div>
        <h3 className="text-2xl font-black">{formatIDR(summary?.totalIncome || 0)}</h3>
        <p className="text-xs text-slate-500 mt-2">
          {Math.abs(summary?.incomeChange || 0)}% {summary?.incomeChange && summary.incomeChange > 0 ? 'higher' : 'lower'} than last month
        </p>
      </div>
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Net Position</p>
          <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
        </div>
        <h3 className="text-2xl font-black">{formatIDR(summary?.netProfit || 0)}</h3>
        <p className="text-xs text-slate-500 mt-2">
          {summary?.profitMargin && summary.profitMargin > 20 ? 'Strong' : 'Stable'} liquidity ratio
        </p>
      </div>
    </div>
  );
};

export default TransactionSummaryWidgets;
