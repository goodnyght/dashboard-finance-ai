import React, { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { formatIDR } from '../data/mockData';

const TransactionTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useTransactions({ page, limit: 10 });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 glass-card rounded-xl">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Date</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Description</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Category</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Amount</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {data?.data.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-100/50 dark:hover:bg-slate-900/40 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {new Date(tx.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-lg">
                        {tx.type === 'income' ? 'payments' : 'shopping_cart'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{tx.description}</span>
                      <span className="text-xs text-slate-500">ID: {tx.displayId}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">{tx.category.name}</td>
                <td className={`px-6 py-4 text-sm font-bold ${tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {tx.type === 'income' ? '+' : '-'}{formatIDR(tx.amount)}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    tx.status === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30' :
                    tx.status === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30' :
                    'bg-rose-100 text-rose-700 dark:bg-rose-900/30'
                  }`}>
                    {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
            {!data?.data.length && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing {(data?.meta.page || 1) * (data?.meta.limit || 10) - (data?.meta.limit || 10) + 1} to {Math.min((data?.meta.page || 1) * (data?.meta.limit || 10), data?.meta.total || 0)} of {data?.meta.total || 0} entries
        </p>
        <div className="flex gap-2">
          <button 
            className="px-3 py-1 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium disabled:opacity-50" 
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
          >
            Previous
          </button>
          {[...Array(data?.meta.totalPages || 0)].map((_, i) => (
            <button 
              key={i} 
              className={`px-3 py-1 rounded text-sm font-medium ${page === i + 1 ? 'bg-primary text-white' : 'border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button 
            className="px-3 py-1 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium disabled:opacity-50"
            disabled={page === (data?.meta.totalPages || 1)}
            onClick={() => setPage(p => Math.min(data?.meta.totalPages || 1, p + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
