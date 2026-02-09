import { useAuth } from '../../contexts/AuthContext';
import { TrendingUp, Package, Users, Receipt } from 'lucide-react';

const DashboardView = () => {
  const { currentUser, getRoleName } = useAuth();

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold">مرحباً، {currentUser?.name}! 👋</h1>
        <p className="mt-2 text-orange-100">الدور: {getRoleName(currentUser?.role)}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border-r-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">الطلبات اليوم</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">12</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Receipt className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-r-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">الإيرادات</p>
              <p className="text-2xl font-bold text-green-600 mt-2">1,250 DH</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-r-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">قيد التحضير</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">5</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-r-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">جاهز للتقديم</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">3</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">آخر النشاطات</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-bold text-gray-800">طلب #{i}</p>
                <p className="text-sm text-gray-600">منذ {i * 5} دقائق</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                مكتمل
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
