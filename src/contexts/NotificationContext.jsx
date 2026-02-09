import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { ROLES, ORDER_STATUS } from '../data/initialData';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { currentUser } = useAuth();

  // إضافة إشعار جديد
  const addNotification = (notification) => {
    const newNotif = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };

    setNotifications(prev => [newNotif, ...prev]);

    // صوت التنبيه (اختياري)
    if (notification.sound !== false) {
      playNotificationSound();
    }

    // إزالة تلقائية بعد 10 ثواني إذا كانت info
    if (notification.type === 'info') {
      setTimeout(() => {
        removeNotification(newNotif.id);
      }, 10000);
    }

    return newNotif.id;
  };

  // إزالة إشعار
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // وضع علامة مقروء
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  // وضع علامة على الكل كمقروء
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // مسح جميع الإشعارات
  const clearAll = () => {
    setNotifications([]);
  };

  // صوت التنبيه
  const playNotificationSound = () => {
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjKH0fPTgjMGHm7A7+OZQQ0PVqvl8LJiHARCm9zzxW8gBi6Az/PMfiwGIXfH8N2RQAkUXbTp66hVFApGnuDyvmwhBjKH0fPTgjMGHm7A7+OZQQ0PVqvl8LJiHARCm9zzxW8gBi6Az/PMfiwGIXfH8N2RQAkUXbTp66hVFApGnuDyvmwhBjKH0fPTgjMGHm7A7+OZQQ0PVqvl8LJiHARCm9zzxW8gBi6Az/PMfiwGIXfH8N2RQAkUXbTp66hVFApGnuDyvmwhBjKH0fPTgjMGHm7A7+OZQQ0PVqvl8LJiHARCm9zzxW8gBi6Az/PMfiwGIXfH8N2RQAkUXbTp66hVFApGnuDyvmwhBjKH0fPTgjMGHm7A7+OZQQ0PVqvl8LJiHARCm9zzxW8gBi6Az/PMfiwGIXfH8N2RQAkUXbTp66hVFApGnuDyvmwhBjKH0fPTgjMGHm7A7+OZQQ0PVqvl8LJiHARCm9zzxW8gBi6Az/PMfiwGIXfH8N2RQAkUXbTp66hVFApGnuDyvmwhBjKH0fPTgjMGHm7A7+OZQQ0PVqvl8LJiHARCm9zzxW8gBi6Az/PMfiwGIXfH8N2RQAkUXbTp66hVFApGnuDyvmwhBjKH0fPTgjMGHm7A7+OZQQ0PVqvl8LJiHARCm9zzxW8gBi6Az/PMfiwGIXfH8N2RQAkUXbTp66hVFApGnuDyvmwhBjKH0fPTgjMGHm7A7+OZQQ0PVqvl8LJiHARCm9zzxW8gBi6Az/PMfiwGIXfH8N2RQAkUXbTp66hVFApGnuDyvmwhBjKH0fPTgjMGHm7A7+OZQQ0PVqvl8LJiHARCm9zzxW8gBi6Az/PMfiwGIXfH8N2RQAkUXbTp66hVFApGnuDyvmwhBjKH0fPTgjMGHm7A7+OZQQ0PVqvl8LJiHARCm9zzxW8gBi6Az/PMfiwGIXfH8N2RQAkUXbTp66hVFApGnuDyvmwhBjKH0fPTgjMGHm7A7+OZQQ0PVqvl8LJiHARCm9zzxW8gBi6Az/PMfiwGIXfH8N2RQAkUXbTp66hVFApGnuDyvmwhBjKH0fPTgjMGHm7A7+OZQQ0PVqvl8LJiHARCm9zzxW8gBi6Az/PMfiwGIXfH8N2RQAkUXbTp66hVFApGnuDyvmwhBjKH0fPTgjMGHm7A7+OZQQ0PVqvl8LJiHARCm9zzxW8gBi6Az/PMfiwGIXfH8N2RQAkUXbTp66hVFApGn+DyvmwhBjKH0fPTgjMGHm7A7+OZQQ0PVqvl8LJiHARCm9zzxW8gBi6Az/PMfiwGIXfH8N2RQAkUXbTp66hVFApGnuDyvmwhBjKH0fPTgjMGHm7A7+OZQQ0PVqvl8LJiHARCm9zzxW8gBi6Az/PMfiwGIXfH8N2RQAkUXbTp66hVFApGnuDyvmwhBjKH0fPTgjMGHm7A7+OZQQ0PVqvl8LJiHARCm9zzxW8gBi6Az/PMfiwGIXfH8N2RQAkUXbTp66hVFApGnuDyvmwhBjKH0fPTgjMGHm7A7+OZQQ0PVqvl8LJiHA==');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch (e) {
      // تجاهل أخطاء الصوت
    }
  };

  // إشعارات محددة حسب الدور
  const notifyOrderCreated = (order) => {
    const targetRoles = [...new Set(order.items.map(item => item.targetRole))];
    
    if (targetRoles.includes(currentUser?.role) || currentUser?.role === ROLES.SUPERADMIN) {
      addNotification({
        type: 'success',
        title: 'طلب جديد!',
        message: `طلب ${order.ref} من الطاولة ${order.tableId}`,
        icon: '🆕',
        action: {
          label: 'عرض',
          path: '/orders',
          orderId: order.id
        }
      });
    }
  };

  const notifyOrderReady = (order) => {
    if (currentUser?.role === ROLES.SERVEUR || currentUser?.role === ROLES.SUPERADMIN) {
      addNotification({
        type: 'info',
        title: 'طلب جاهز!',
        message: `الطلب ${order.ref} جاهز للتقديم`,
        icon: '✅',
        action: {
          label: 'عرض',
          orderId: order.id
        }
      });
    }
  };

  const notifyPaymentValidated = (transaction) => {
    if (currentUser?.role === ROLES.SUPERADMIN || currentUser?.role === ROLES.CAISSIER) {
      addNotification({
        type: 'success',
        title: 'دفع مؤكد',
        message: `تم تأكيد دفع ${transaction.amount} DH للطلب ${transaction.orderRef}`,
        icon: '💰'
      });
    }
  };

  const notifyComplaint = (complaint) => {
    if (currentUser?.role === ROLES.SUPERADMIN) {
      addNotification({
        type: 'warning',
        title: 'شكوى جديدة',
        message: `شكوى على الطلب ${complaint.orderRef}`,
        icon: '⚠️',
        action: {
          label: 'عرض',
          path: '/complaints',
          complaintId: complaint.id
        }
      });
    }
  };

  const notifyOrderRefused = (order, reason) => {
    if (currentUser?.role === ROLES.SERVEUR || currentUser?.role === ROLES.SUPERADMIN) {
      addNotification({
        type: 'error',
        title: 'طلب مرفوض',
        message: `تم رفض الطلب ${order.ref}: ${reason}`,
        icon: '❌'
      });
    }
  };

  const notifyLowStock = (product) => {
    if (currentUser?.role === ROLES.SUPERADMIN || currentUser?.role === ROLES.CUISINIER) {
      addNotification({
        type: 'warning',
        title: 'مخزون منخفض',
        message: `المنتج "${product.name}" على وشك النفاذ`,
        icon: '📦'
      });
    }
  };

  const value = {
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    // إشعارات محددة
    notifyOrderCreated,
    notifyOrderReady,
    notifyPaymentValidated,
    notifyComplaint,
    notifyOrderRefused,
    notifyLowStock
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
