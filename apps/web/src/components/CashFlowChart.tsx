import React from 'react';
import { useCashFlow } from '../hooks/useDashboard';

const CashFlowChart: React.FC = () => {
  const { data: cashFlow, isLoading } = useCashFlow(6);

  if (isLoading) {
    return (
      <div className="glass-card p-6 rounded-2xl lg:col-span-2 shadow-lg shadow-black/5 flex items-center justify-center h-80">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const maxAmount = Math.max(...(cashFlow?.map(d => Math.max(d.income, d.expense)) || [1]));
  const gridValues = [
    Math.round(maxAmount / 1000000) + 'M',
    Math.round((maxAmount * 0.6) / 1000000) + 'M',
    Math.round((maxAmount * 0.2) / 1000000) + 'M',
    '0'
  ];

  return (
    <div className="glass-card p-6 rounded-2xl lg:col-span-2 shadow-lg shadow-black/5">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-slate-100">Cash Flow Trend</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-primary shadow-sm shadow-primary/50"></span>
            <span className="text-xs text-slate-400 font-medium">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-slate-500 shadow-sm shadow-slate-500/50"></span>
            <span className="text-xs text-slate-400 font-medium">Expense</span>
          </div>
        </div>
      </div>
      
      <div className="h-64 relative flex items-end justify-between px-2 gap-4">
        {/* Dynamic Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between py-2 text-[10px] text-slate-600 font-bold uppercase tracking-widest pointer-events-none">
          {gridValues.map((val, i) => (
            <div key={i} className={`${i < 3 ? 'border-b border-slate-700/30 w-full pb-1' : 'pb-1'}`}>{val}</div>
          ))}
        </div>
        
        {cashFlow?.map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2 group relative z-10 cursor-pointer">
            <div className="w-full flex items-end gap-1 h-full">
              <div 
                className="w-1/2 bg-primary/40 group-hover:bg-primary transition-all duration-300 rounded-t-sm" 
                style={{ height: `${(data.income / maxAmount) * 100}%` }}
                title={`Income: ${data.income}`}
              ></div>
              <div 
                className="w-1/2 bg-slate-700/40 group-hover:bg-slate-500 transition-all duration-300 rounded-t-sm" 
                style={{ height: `${(data.expense / maxAmount) * 100}%` }}
                title={`Expense: ${data.expense}`}
              ></div>
            </div>
            <span className="text-[10px] text-slate-500 font-bold group-hover:text-slate-300 transition-colors uppercase">
              {data.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CashFlowChart;
