import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-slate-50 dark:bg-slate-950/50 relative">
        <TopBar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
