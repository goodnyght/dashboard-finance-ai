import React, { useState } from 'react';

type TabType = 'USERS' | 'ROLES' | 'AUDIT';

const UsersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('USERS');

  // Hardcoded mock data for demonstration
  const mockUsers = [
    { id: 1, name: 'Budi Santoso', email: 'budi@company.id', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Sari Dewi', email: 'sari@company.id', role: 'Staff', status: 'Active' },
    { id: 3, name: 'Andi Rahman', email: 'andi@company.id', role: 'Staff', status: 'Active' },
    { id: 4, name: 'Maya Putri', email: 'maya@company.id', role: 'Viewer', status: 'Invited' },
    { id: 5, name: 'Riko Pratama', email: 'riko@company.id', role: 'Staff', status: 'Active' },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">User Management</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage team access, roles, and review audit logs.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold text-sm rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all">
            <span className="material-symbols-outlined text-xl">person_add</span>
            Invite User
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => setActiveTab('USERS')}
          className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'USERS' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          Users
        </button>
        <button 
          onClick={() => setActiveTab('ROLES')}
          className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'ROLES' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          Roles
        </button>
        <button 
          onClick={() => setActiveTab('AUDIT')}
          className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'AUDIT' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          Audit Log
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === 'USERS' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            {/* Search Bar */}
            <div className="relative max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
              <input 
                type="text" 
                placeholder="Search users by name or email..." 
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-500" 
              />
            </div>

            {/* Users Table */}
            <div className="glass-card rounded-2xl shadow-lg shadow-black/5 overflow-hidden border border-slate-200/50 dark:border-slate-800/50">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="px-6 py-4 font-medium rounded-tl-lg w-12"></th>
                      <th className="px-6 py-4 font-medium">Name</th>
                      <th className="px-6 py-4 font-medium">Email</th>
                      <th className="px-6 py-4 font-medium">Role</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium text-right rounded-tr-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-900 dark:text-slate-100">
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                            {user.name.charAt(0)}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold">{user.name}</td>
                        <td className="px-6 py-4 text-slate-500">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full ${
                            user.role === 'Admin' ? 'bg-primary/10 text-primary' :
                            user.role === 'Staff' ? 'bg-emerald-500/10 text-emerald-500' :
                            'bg-slate-500/10 text-slate-500'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                             <div className={`size-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                             <span className="text-slate-600 dark:text-slate-300">{user.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-400 hover:text-primary transition-colors p-1 opacity-0 group-hover:opacity-100">
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ROLES' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-300">
            {/* Roles Tab Content */}
            <div className="glass-card p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
              <div className="flex items-center gap-3 mb-4">
                 <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">shield_person</span>
                 </div>
                 <h3 className="text-lg font-bold text-slate-100">Admin</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 mb-6">
                <li className="flex gap-2"><span className="material-symbols-outlined text-emerald-500 text-sm">check_circle</span> Full Access</li>
                <li className="flex gap-2"><span className="material-symbols-outlined text-emerald-500 text-sm">check_circle</span> Manage Users</li>
                <li className="flex gap-2"><span className="material-symbols-outlined text-emerald-500 text-sm">check_circle</span> Approve Transactions</li>
              </ul>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-500">1 User</div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 border-t-4 border-t-emerald-500">
              <div className="flex items-center gap-3 mb-4">
                 <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <span className="material-symbols-outlined">edit_square</span>
                 </div>
                 <h3 className="text-lg font-bold text-slate-100">Finance Staff</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 mb-6">
                <li className="flex gap-2"><span className="material-symbols-outlined text-emerald-500 text-sm">check_circle</span> Input Data</li>
                <li className="flex gap-2"><span className="material-symbols-outlined text-emerald-500 text-sm">check_circle</span> View Reports</li>
                <li className="flex gap-2"><span className="material-symbols-outlined text-rose-500 text-sm">cancel</span> Manage Users</li>
              </ul>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-500">3 Users</div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 border-t-4 border-t-slate-500">
              <div className="flex items-center gap-3 mb-4">
                 <div className="size-10 rounded-full bg-slate-500/10 flex items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined">visibility</span>
                 </div>
                 <h3 className="text-lg font-bold text-slate-100">Viewer</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 mb-6">
                <li className="flex gap-2"><span className="material-symbols-outlined text-emerald-500 text-sm">check_circle</span> View Dashboard</li>
                <li className="flex gap-2"><span className="material-symbols-outlined text-rose-500 text-sm">cancel</span> Edit Data</li>
                <li className="flex gap-2"><span className="material-symbols-outlined text-rose-500 text-sm">cancel</span> Export Data</li>
              </ul>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-500">1 User</div>
            </div>
          </div>
        )}

        {activeTab === 'AUDIT' && (
          <div className="glass-card p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 animate-in fade-in zoom-in-95 duration-300">
            {/* Audit Log Timeline */}
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-background-dark bg-emerald-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="material-symbols-outlined text-base">check</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50 shadow">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-slate-900 dark:text-slate-100">Budi Santoso</div>
                    <time className="text-xs text-slate-500">08 Mar, 09:15</time>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300 text-balance">Approved transaction <span className="font-mono text-primary bg-primary/10 px-1 rounded">TRX-1055</span></div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-background-dark bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="material-symbols-outlined text-base">add</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50 shadow">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-slate-900 dark:text-slate-100">Sari Dewi</div>
                    <time className="text-xs text-slate-500">07 Mar, 16:42</time>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300 text-balance">Added transaction "Gaji Karyawan" pending approval.</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-background-dark bg-amber-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="material-symbols-outlined text-base">edit</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50 shadow">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-slate-900 dark:text-slate-100">Budi Santoso</div>
                    <time className="text-xs text-slate-500">06 Mar, 11:05</time>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300 text-balance">Updated budget allocation for <span className="font-bold">Marketing</span> department.</div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
