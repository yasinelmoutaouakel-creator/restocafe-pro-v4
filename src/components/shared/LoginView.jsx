import { useState } from 'react';
import { LogIn, Lock, User, Coffee } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = login(username, password);
      
      if (!result.success) {
        setError(result.message);
      }
      
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="relative w-full max-w-md">
        {/* بطاقة تسجيل الدخول */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* الرأس */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
              <Coffee className="w-10 h-10 text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">RestoCaféZM</h1>
            <p className="text-orange-100">نظام إدارة المطاعم والمقاهي</p>
          </div>

          {/* النموذج */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">تسجيل الدخول</h2>
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* حقل اسم المستخدم */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم المستخدم
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pr-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    placeholder="أدخل اسم المستخدم"
                    required
                    autoFocus
                    dir="rtl"
                  />
                </div>
              </div>

              {/* حقل كلمة المرور */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  كلمة المرور
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pr-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    placeholder="أدخل كلمة المرور"
                    required
                    dir="rtl"
                  />
                </div>
              </div>

              {/* زر الدخول */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 space-x-reverse"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>جاري تسجيل الدخول...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>تسجيل الدخول</span>
                  </>
                )}
              </button>
            </form>

            {/* معلومات تجريبية */}
            <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-xs text-orange-800 font-medium mb-2">معلومات تسجيل الدخول التجريبية:</p>
              <div className="space-y-1 text-xs text-orange-700">
                <p>• <strong>المسؤول الرئيسي:</strong> superadmin / admin123</p>
              </div>
            </div>
          </div>
        </div>

        {/* تذييل */}
        <div className="text-center mt-6 text-white text-sm">
          <p className="drop-shadow-lg">© 2024 RestoCaféZM - جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
