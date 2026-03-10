import React from 'react';
import StatCard from './StatCard';
import CashFlowChart from './CashFlowChart';
import ExpenseChart from './ExpenseChart';
import { formatIDR } from '../data/mockData';
import { Link } from 'react-router-dom';
import { useDashboardSummary, useRecentTransactions } from '../hooks/useDashboard';

const DashboardOverview: React.FC = () => {
  const { data: summary, isLoading: isSummaryLoading } = useDashboardSummary();


  console.log({ summary, isSummaryLoading })
  const { data: recentTransactions, isLoading: isTransactionsLoading } = useRecentTransactions(5);

  if (isSummaryLoading || isTransactionsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Net Profit"
          value={formatIDR(summary?.netProfit || 0)}
          icon="account_balance_wallet"
          iconBgClass="bg-primary/20"
          iconTextClass="text-primary"
          subtitle={`${summary?.profitChange || 0}% from last month`}
          subtitleColorClass={(summary?.profitChange || 0) >= 0 ? "text-emerald-500" : "text-rose-500"}
          subtitleIcon={(summary?.profitChange || 0) >= 0 ? "trending_up" : "trending_down"}
        />
        <StatCard
          title="Income"
          value={formatIDR(summary?.totalIncome || 0)}
          icon="arrow_downward"
          iconBgClass="bg-emerald-500/20"
          iconTextClass="text-emerald-500"
          subtitle={`${summary?.incomeChange || 0}% from last month`}
          subtitleColorClass={(summary?.incomeChange || 0) >= 0 ? "text-emerald-500" : "text-rose-500"}
          subtitleIcon={(summary?.incomeChange || 0) >= 0 ? "trending_up" : "trending_down"}
        />
        <StatCard
          title="Expense"
          value={formatIDR(summary?.totalExpenses || 0)}
          icon="arrow_upward"
          iconBgClass="bg-rose-500/20"
          iconTextClass="text-rose-500"
          subtitle={`${summary?.expenseChange || 0}% from last month`}
          subtitleColorClass={(summary?.expenseChange || 0) <= 0 ? "text-emerald-500" : "text-rose-500"}
          subtitleIcon={(summary?.expenseChange || 0) <= 0 ? "trending_down" : "trending_up"}
        />
        <StatCard
          title="Profit Margin"
          value={`${(summary?.profitMargin || 0).toFixed(1)}%`}
          icon="monitoring"
          iconBgClass="bg-amber-500/20"
          iconTextClass="text-amber-500"
          subtitle="Real-time margin"
          subtitleColorClass="text-slate-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CashFlowChart />
        <div className="glass-card rounded-2xl p-6 shadow-lg shadow-black/5 flex flex-col items-center justify-center">
          <ExpenseChart />
        </div>
      </div>

      <div className="glass-card rounded-2xl shadow-lg shadow-black/5 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-100">Recent Transactions</h3>
          <Link to="/transactions" className="text-sm text-primary font-bold hover:underline">View All →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium rounded-tl-lg">Date</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-900 dark:text-slate-100">
              {recentTransactions?.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">{new Date(tx.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}</td>
                  <td className="px-6 py-4 font-medium">{tx.description}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-xs rounded font-medium text-slate-600 dark:text-slate-300">
                      {tx.category.name}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-right font-bold ${tx.type === 'income' ? 'text-emerald-500' : ''}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatIDR(tx.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full ${tx.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                        tx.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                          'bg-rose-500/10 text-rose-500'
                      }`}>
                      {tx.status === 'approved' && <span className="size-1.5 rounded-full bg-emerald-500"></span>}
                      {tx.status === 'pending' && <span className="size-1.5 rounded-full bg-amber-500"></span>}
                      {tx.status === 'rejected' && <span className="size-1.5 rounded-full bg-rose-500"></span>}
                      {tx.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
              {!recentTransactions?.length && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No recent transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DashboardOverview;
