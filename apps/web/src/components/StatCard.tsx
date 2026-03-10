import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  iconBgClass: string;
  iconTextClass: string;
  subtitle: string;
  subtitleColorClass?: string;
  subtitleIcon?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconBgClass,
  iconTextClass,
  subtitle,
  subtitleColorClass = "text-slate-500",
  subtitleIcon
}) => {
  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col gap-4 transition-transform hover:-translate-y-1 duration-300 group">
      <div className="flex items-center justify-between">
        <p className="text-slate-400 text-sm font-medium group-hover:text-slate-300 transition-colors">{title}</p>
        <div className={`p-2 rounded-lg ${iconBgClass} ${iconTextClass}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
      </div>
      <div>
        <p className="text-2xl font-black text-slate-100">{value}</p>
        <p className={`text-xs mt-1 flex items-center gap-1 ${subtitleColorClass} ${subtitleIcon ? 'font-bold' : ''}`}>
          {subtitleIcon && <span className="material-symbols-outlined text-xs">{subtitleIcon}</span>}
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
