import React from 'react';
import { useExpenseBreakdown } from '../hooks/useDashboard';

const ExpenseChart: React.FC = () => {
  const { data: breakdown, isLoading } = useExpenseBreakdown();

  if (isLoading) {
    return (
      <div className="glass-card p-6 rounded-2xl shadow-lg shadow-black/5 flex items-center justify-center h-80">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Calculate cumulative offsets for SVG stroke-dashoffset
  let cumulativePercentage = 0;

  return (
    <div className="glass-card p-6 rounded-2xl shadow-lg shadow-black/5 hover:shadow-black/20 transition-shadow duration-300 w-full">
      <h3 className="text-lg font-bold text-slate-100 mb-6">Expense Breakdown</h3>
      <div className="flex flex-col items-center justify-center">
        <div className="relative size-48 transition-transform hover:scale-105 duration-500">
          <svg className="size-full -rotate-90 drop-shadow-lg" viewBox="0 0 36 36">
            <circle className="stroke-slate-700/30" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
            {breakdown?.map((item, index) => {
              const dashArray = `${item.percentage} 100`;
              const dashOffset = -cumulativePercentage;
              cumulativePercentage += item.percentage;
              
              return (
                <circle 
                  key={index}
                  style={{ stroke: item.color }}
                  cx="18" cy="18" fill="none" r="16" 
                  strokeDasharray={dashArray} 
                  strokeDashoffset={dashOffset} 
                  strokeWidth="3"
                ></circle>
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-slate-100 drop-shadow-md">100%</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total</span>
          </div>
        </div>
        
        <div className="w-full mt-8 grid grid-cols-2 gap-4">
          {breakdown?.map((item, index) => (
            <div key={index} className="flex items-center gap-2 group cursor-pointer p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
              <span 
                className="size-2 rounded-full shadow-sm group-hover:scale-125 transition-transform"
                style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}80` }}
              ></span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-100 group-hover:text-white transition-colors capitalize">{item.category}</span>
                <span className="text-[10px] text-slate-500">{item.percentage}%</span>
              </div>
            </div>
          ))}
          {!breakdown?.length && (
            <div className="col-span-2 text-center text-slate-500 text-sm py-4">
              No data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
