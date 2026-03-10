import React from 'react';

const CashForecastChart: React.FC = () => {
  return (
    <div className="glass-card p-6 rounded-2xl shadow-lg shadow-black/5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-100">Cash Forecast (Q1-Q2)</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-4 h-1 rounded-full bg-slate-500"></span>
            <span className="text-xs text-slate-400 font-medium">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-1 rounded-full bg-primary/40 border border-primary border-dashed"></span>
            <span className="text-xs text-primary font-medium">Forecast</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 relative min-h-[200px] flex items-end justify-between px-2 pt-8 pb-4">
        {/* Y Axis */}
        <div className="absolute inset-y-0 left-0 flex flex-col justify-between py-4 text-[10px] text-slate-600 font-bold uppercase tracking-widest pointer-events-none z-0 pr-2">
          <div className="flex-1 border-t border-slate-700/30 w-full relative"><span className="-top-3 absolute left-0">900M</span></div>
          <div className="flex-1 border-t border-slate-700/30 w-full relative"><span className="-top-3 absolute left-0">700M</span></div>
          <div className="flex-1 border-t border-slate-700/30 w-full relative"><span className="-top-3 absolute left-0">500M</span></div>
          <div className="border-t border-slate-700/30 w-full relative"><span className="-top-3 absolute left-0">300M</span></div>
        </div>

        {/* Chart Area */}
        <div className="absolute inset-0 pl-12 pr-4 py-4 flex items-end justify-between z-10">
           {/* SVG for Line Chart Simulation */}
           <svg className="w-full h-full preserve-3d" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Actual Line */}
              <polyline 
                points="0,80 20,70 40,65" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                className="text-slate-400"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="0" cy="80" r="1.5" className="fill-slate-400" />
              <circle cx="20" cy="70" r="1.5" className="fill-slate-400" />
              <circle cx="40" cy="65" r="1.5" className="fill-slate-400" />

              {/* Forecast Line */}
              <polyline 
                points="40,65 60,45 80,30 100,15" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeDasharray="2,2"
                className="text-primary"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="60" cy="45" r="1.5" className="fill-primary" />
              <circle cx="80" cy="30" r="1.5" className="fill-primary" />
              <circle cx="100" cy="15" r="1.5" className="fill-primary" />
              
              {/* Forecast Shaded Area */}
              <polygon 
                points="40,65 60,45 80,30 100,15 100,100 40,100" 
                fill="currentColor" 
                className="text-primary/10"
              />
           </svg>
        </div>

        {/* X Axis Labels */}
        <div className="absolute bottom-0 left-12 right-4 flex justify-between text-[10px] text-slate-500 font-bold tracking-wider pt-2">
          <span>JAN</span>
          <span>FEB</span>
          <span>MAR</span>
          <span className="text-primary">APR</span>
          <span className="text-primary">MAY</span>
          <span className="text-primary">JUN</span>
        </div>
      </div>
    </div>
  );
};

export default CashForecastChart;
