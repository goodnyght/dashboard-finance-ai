import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSession, signOut } from '../lib/auth';

const Sidebar: React.FC = () => {
  const { data: session } = useSession();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark flex flex-col h-screen sticky top-0 md:block hidden">
      <div className="p-6 flex items-center gap-3">
        <div className="size-8 bg-primary rounded flex items-center justify-center text-white">
          <span className="material-symbols-outlined">account_balance_wallet</span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">Finansia</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs">Enterprise Finance</p>
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded transition-colors group ${isActive ? 'sidebar-item-active' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          {({ isActive }) => (
            <>
              <span className={`material-symbols-outlined text-slate-500 group-hover:text-primary ${isActive ? 'text-primary' : ''}`}>dashboard</span>
              <span className={`text-sm font-medium ${isActive ? 'dark:text-white' : ''}`}>Dashboard</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded transition-colors group ${isActive ? 'sidebar-item-active' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          {({ isActive }) => (
            <>
              <span className={`material-symbols-outlined text-slate-500 group-hover:text-primary ${isActive ? 'text-primary' : ''}`}>receipt_long</span>
              <span className={`text-sm font-medium ${isActive ? 'dark:text-white' : ''}`}>Transactions</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded transition-colors group ${isActive ? 'sidebar-item-active' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          {({ isActive }) => (
            <>
              <span className={`material-symbols-outlined text-slate-500 group-hover:text-primary ${isActive ? 'text-primary' : ''}`}>bar_chart</span>
              <span className={`text-sm font-medium ${isActive ? 'dark:text-white' : ''}`}>Reports</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/budgets"
          className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded transition-colors group ${isActive ? 'sidebar-item-active' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          {({ isActive }) => (
            <>
              <span className={`material-symbols-outlined text-slate-500 group-hover:text-primary ${isActive ? 'text-primary' : ''}`}>account_balance</span>
              <span className={`text-sm font-medium ${isActive ? 'dark:text-white' : ''}`}>Budgets</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded transition-colors group ${isActive ? 'sidebar-item-active' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          {({ isActive }) => (
            <>
              <span className={`material-symbols-outlined text-slate-500 group-hover:text-primary ${isActive ? 'text-primary' : ''}`}>settings</span>
              <span className={`text-sm font-medium ${isActive ? 'dark:text-white' : ''}`}>Settings</span>
            </>
          )}
        </NavLink>
      </nav>

      <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined text-lg">person</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
              {session?.user?.name || 'User'}
            </span>
            <span className="text-[10px] text-slate-500 truncate">
              {session?.user?.email || 'user@example.com'}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-red-500 transition-colors group"
        >
          <span className="material-symbols-outlined text-lg group-hover:text-red-500">logout</span>
          <span className="text-xs font-bold">Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
