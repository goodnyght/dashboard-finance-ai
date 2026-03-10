import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/Dashboard';
import TransactionsPage from './pages/Transactions';
import BudgetingPage from './pages/Budgeting';
import UsersPage from './pages/Users';
import ReportsPage from './pages/Reports';
import SettingsPage from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/budgets" element={<BudgetingPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Add more routes here as we build them */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
