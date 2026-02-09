import { useNotifications } from '../../contexts/NotificationContext';
import { Bell, X, Check } from 'lucide-react';
import { useState } from 'react';

const NotificationCenter = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll, removeNotification } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative" dir="rtl">
      {/* زر الجرس */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* القائمة المنسدلة */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          
          <div className="absolute left-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-[80vh] overflow-hidden flex flex-col">
            {/* الرأس */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-orange-50 to-red-50">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-600" />
                <h3 className="font-bold text-gray-800">الإشعارات</h3>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              {notifications.length > 0 && (
                <div className="flex gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                    >
                      وضع علامة على الكل
                    </button>
                  )}
                  <button
                    onClick={clearAll}
                    className="text-xs text-red-600 hover:text-red-700 font-medium"
                  >
                    مسح
                  </button>
                </div>
              )}
            </div>

            {/* قائمة الإشعارات */}
            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>لا توجد إشعارات</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 hover:bg-gray-50 transition cursor-pointer ${
                        !notif.read ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                      }`}
                      onClick={() => !notif.read && markAsRead(notif.id)}
                    >
                      <div className="flex gap-3">
                        {/* الأيقونة */}
                        <div className="flex-shrink-0 text-2xl">
                          {notif.icon}
                        </div>

                        {/* المحتوى */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-bold text-gray-800 text-sm">
                              {notif.title}
                            </h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notif.id);
                              }}
                              className="text-gray-400 hover:text-red-600 transition"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <p className="text-gray-600 text-sm mt-1">
                            {notif.message}
                          </p>

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-400">
                              {new Date(notif.timestamp).toLocaleTimeString('ar-MA', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>

                            {notif.action && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notif.id);
                                  setIsOpen(false);
                                }}
                                className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition font-medium"
                              >
                                {notif.action.label}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCenter;
