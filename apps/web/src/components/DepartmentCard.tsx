import React from 'react';
import { formatIDR } from '../data/mockData';

interface DepartmentCardProps {
  name: string;
  actualAmount: number;
  budgetAmount: number;
  isWarning?: boolean;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({
  name,
  actualAmount,
  budgetAmount,
  isWarning = false
}) => {
  const percentage = Math.min(Math.round((actualAmount / budgetAmount) * 100), 100);
  const remaining = budgetAmount - actualAmount;
  const isOverBudget = remaining < 0;

  let barColorClass = "bg-primary";
  if (isOverBudget) barColorClass = "bg-rose-500";
  else if (isWarning || percentage >= 90) barColorClass = "bg-amber-500";

  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col gap-4 border border-slate-200/50 dark:border-slate-800/50 hover:border-primary/50 transition-colors">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-slate-900 dark:text-slate-100">{name}</h4>
        {isWarning && (
           <span className="material-symbols-outlined text-amber-500" title="Warning">warning</span>
        )}
      </div>
      
      <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex relative">
        <div 
          className={`absolute top-0 left-0 h-full ${barColorClass} transition-all duration-1000 ease-out`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between items-center mt-1 text-xs">
         <span className="font-bold text-slate-600 dark:text-slate-400">{percentage}%</span>
         <span className="text-slate-500">{formatIDR(actualAmount)} / {formatIDR(budgetAmount)}</span>
      </div>

      <div className="mt-2 text-sm">
        <span className="text-slate-500">Sisa: </span>
        <span className={`font-bold ${isOverBudget ? 'text-rose-500' : 'text-emerald-500'}`}>
           {formatIDR(Math.abs(remaining))} {isOverBudget && '(Defisit)'}
        </span>
      </div>
    </div>
  );
};

export default DepartmentCard;
