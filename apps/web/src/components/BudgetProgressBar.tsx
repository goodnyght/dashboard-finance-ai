import React from 'react';
import { formatIDR } from '../data/mockData';

interface BudgetProgressBarProps {
  label: string;
  actualAmount: number;
  budgetAmount: number;
  isWarning?: boolean;
}

const BudgetProgressBar: React.FC<BudgetProgressBarProps> = ({ 
  label, 
  actualAmount, 
  budgetAmount, 
  isWarning = false 
}) => {
  const percentage = Math.min(Math.round((actualAmount / budgetAmount) * 100), 100);
  const isOverBudget = actualAmount > budgetAmount;
  
  // Determine bar color based on status
  let barColorClass = "bg-primary";
  if (isOverBudget) barColorClass = "bg-rose-500";
  else if (isWarning || percentage >= 90) barColorClass = "bg-amber-500";

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700 dark:text-slate-300 w-32">{label}</span>
          {(isWarning || isOverBudget) && (
            <span className="material-symbols-outlined text-sm text-amber-500">warning</span>
          )}
        </div>
        <div className="text-sm">
          <span className="font-bold text-slate-900 dark:text-slate-100">{formatIDR(actualAmount)}</span>
          <span className="text-slate-500"> / {formatIDR(budgetAmount)}</span>
        </div>
      </div>
      <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
        <div 
          className={`h-full ${barColorClass} transition-all duration-1000 ease-out`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default BudgetProgressBar;
