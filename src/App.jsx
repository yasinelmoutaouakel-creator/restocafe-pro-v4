import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Sidebar from './components/shared/Sidebar';
import LoginView from './components/shared/LoginView';
import DashboardView from './components/shared/DashboardView';

// مكونات مؤقتة
const ComingSoon = ({ title }) => (
  <div className="p-6" dir="rtl">
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600">قيد التطوير...</p>
      </div>
    </div>
  </div>
);

const AppContent = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginView />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'tables':
        return <ComingSoon title="إدارة الطاولات" />;
      case 'orders':
      case 'new-order':
      case 'my-orders':
        return <ComingSoon title="إدارة الطلبات" />;
      case 'monitoring':
        return <ComingSoon title="المراقبة الفورية" />;
      case 'transactions':
      case 'payment':
        return <ComingSoon title="المعاملات والدفع" />;
      case 'drinks-queue':
        return <ComingSoon title="طلبات المشروبات" />;
      case 'kitchen-queue':
        return <ComingSoon title="طلبات المطبخ" />;
      case 'my-prep':
        return <ComingSoon title="قيد التحضير" />;
      case 'inventory':
        return <ComingSoon title="المخزون" />;
      case 'employees':
        return <ComingSoon title="الموظفون" />;
      case 'suppliers':
        return <ComingSoon title="الموردون" />;
      case 'reports':
        return <ComingSoon title="التقارير" />;
      case 'users':
        return <ComingSoon title="إدارة المستخدمين" />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
