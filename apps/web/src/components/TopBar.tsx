import React from 'react';
import { useSession } from '../lib/auth';

const TopBar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
          <input className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-500" placeholder="Search transactions, invoices, or departments..." type="text"/>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative text-slate-500 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-2xl">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
        </button>
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-none text-slate-900 dark:text-slate-100">
              {session?.user.name || 'Anonymous User'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {(session?.user as any)?.role === 'admin' ? 'Finance Director' : 'Business User'}
            </p>
          </div>
          <img 
            alt={session?.user.name || 'User Profile'} 
            className="size-10 rounded-full bg-slate-200 object-cover" 
            src={session?.user.image || `https://ui-avatars.com/api/?name=${session?.user.name || 'User'}&background=random`}
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
