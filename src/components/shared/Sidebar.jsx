import { LayoutDashboard, ShoppingCart, TableProperties, Receipt, Package, Users, Truck, FileText, Shield, LogOut, Coffee, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ROLES } from '../../data/initialData';
import NotificationCenter from './NotificationCenter';

const Sidebar = ({ activeView, setActiveView }) => {
  const { currentUser, logout, getRoleName } = useAuth();

  const getMenuItems = () => {
    const role = currentUser?.role;
    
    // قوائم حسب الدور
    const menus = {
      [ROLES.SUPERADMIN]: [
        { id: 'dashboard', name: 'لوحة التحكم', icon: LayoutDashboard },
        { id: 'monitoring', name: 'المراقبة الفورية', icon: Bell },
        { id: 'tables', name: 'الطاولات', icon: TableProperties },
        { id: 'orders', name: 'الطلبات', icon: ShoppingCart },
        { id: 'transactions', name: 'المعاملات', icon: Receipt },
        { id: 'inventory', name: 'المخزون', icon: Package },
        { id: 'employees', name: 'الموظفون', icon: Users },
        { id: 'suppliers', name: 'الموردون', icon: Truck },
        { id: 'reports', name: 'التقارير', icon: FileText },
        { id: 'users', name: 'إدارة المستخدمين', icon: Shield },
      ],
      [ROLES.SERVEUR]: [
        { id: 'tables', name: 'الطاولات', icon: TableProperties },
        { id: 'new-order', name: 'طلب جديد', icon: ShoppingCart },
        { id: 'my-orders', name: 'طلباتي', icon: Receipt },
        { id: 'dashboard', name: 'أدائي', icon: LayoutDashboard },
      ],
      [ROLES.BARISTA]: [
        { id: 'drinks-queue', name: 'طلبات المشروبات', icon: Coffee },
        { id: 'my-prep', name: 'قيد التحضير', icon: ShoppingCart },
        { id: 'dashboard', name: 'إحصائياتي', icon: LayoutDashboard },
      ],
      [ROLES.CUISINIER]: [
        { id: 'kitchen-queue', name: 'طلبات المطبخ', icon: ShoppingCart },
        { id: 'my-prep', name: 'قيد التحضير', icon: Package },
        { id: 'dashboard', name: 'إحصائياتي', icon: LayoutDashboard },
      ],
      [ROLES.CAISSIER]: [
        { id: 'payment', name: 'الدفع', icon: Receipt },
        { id: 'transactions', name: 'المعاملات', icon: FileText },
        { id: 'dashboard', name: 'إحصائياتي', icon: LayoutDashboard },
      ],
    };

    return menus[role] || menus[ROLES.SERVEUR];
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen flex flex-col shadow-2xl" dir="rtl">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
            <Coffee className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold">RestoCafé Pro</h1>
            <p className="text-xs text-gray-400">Version 4.0</p>
          </div>
        </div>
        
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center font-bold">
              {currentUser?.name?.[0] || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{currentUser?.name}</p>
              <p className="text-xs text-gray-400 truncate">{getRoleName(currentUser?.role)}</p>
            </div>
            <NotificationCenter />
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 shadow-lg scale-105'
                  : 'hover:bg-gray-700 hover:scale-105'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                {item.name}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-200 hover:scale-105 shadow-lg"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
