import { createContext, useContext, useState, useEffect } from 'react';
import { getData, saveData, addAuditLog, ROLES } from '../data/initialData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('v4_currentUser');
    const savedUsers = getData('users');
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    
    if (savedUsers) {
      setUsers(savedUsers);
    }
  }, []);

  const login = (username, password) => {
    const user = users.find(
      u => u.username === username && u.password === password && u.active
    );
    
    if (user) {
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('v4_currentUser', JSON.stringify(userWithoutPassword));
      
      // سجل التدقيق
      addAuditLog(user.id, 'login', { username: user.username, role: user.role });
      
      return { success: true, user: userWithoutPassword };
    }
    
    return { success: false, message: 'اسم المستخدم أو كلمة المرور غير صحيحة' };
  };

  const logout = () => {
    if (currentUser) {
      addAuditLog(currentUser.id, 'logout', { username: currentUser.username });
    }
    setCurrentUser(null);
    localStorage.removeItem('v4_currentUser');
  };

  const addUser = (userData) => {
    if (currentUser?.role !== ROLES.SUPERADMIN) {
      return { success: false, message: 'لا تملك صلاحية إضافة مستخدمين' };
    }

    const existingUser = users.find(u => u.username === userData.username);
    if (existingUser) {
      return { success: false, message: 'اسم المستخدم موجود بالفعل' };
    }

    const newUser = {
      ...userData,
      id: users.length + 1,
      active: true,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    saveData('users', updatedUsers);
    
    addAuditLog(currentUser.id, 'user_created', { 
      newUserId: newUser.id, 
      username: newUser.username, 
      role: newUser.role 
    });
    
    return { success: true, user: newUser };
  };

  const updateUser = (userId, updates) => {
    if (currentUser?.role !== ROLES.SUPERADMIN) {
      return { success: false, message: 'لا تملك صلاحية تعديل المستخدمين' };
    }

    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, ...updates } : u
    );
    
    setUsers(updatedUsers);
    saveData('users', updatedUsers);
    
    addAuditLog(currentUser.id, 'user_updated', { userId, updates });
    
    return { success: true };
  };

  const deleteUser = (userId) => {
    if (currentUser?.role !== ROLES.SUPERADMIN) {
      return { success: false, message: 'لا تملك صلاحية حذف المستخدمين' };
    }

    if (userId === currentUser?.id) {
      return { success: false, message: 'لا يمكنك حذف حسابك الخاص' };
    }

    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
    saveData('users', updatedUsers);
    
    addAuditLog(currentUser.id, 'user_deleted', { userId });
    
    return { success: true };
  };

  // دالة للتحقق من الصلاحيات
  const hasPermission = (requiredRole) => {
    if (!currentUser) return false;
    if (currentUser.role === ROLES.SUPERADMIN) return true;
    return currentUser.role === requiredRole;
  };

  // دالة للحصول على اسم الدور بالعربية
  const getRoleName = (role) => {
    const roleNames = {
      [ROLES.SUPERADMIN]: 'مسؤول رئيسي',
      [ROLES.SERVEUR]: 'نادل/ة',
      [ROLES.BARISTA]: 'باريستا',
      [ROLES.CUISINIER]: 'طباخ',
      [ROLES.CAISSIER]: 'أمين صندوق'
    };
    return roleNames[role] || role;
  };

  const value = {
    currentUser,
    users: users.map(u => {
      const { password, ...userWithoutPassword } = u;
      return userWithoutPassword;
    }),
    login,
    logout,
    addUser,
    updateUser,
    deleteUser,
    hasPermission,
    getRoleName,
    isSuperAdmin: currentUser?.role === ROLES.SUPERADMIN,
    isServeur: currentUser?.role === ROLES.SERVEUR,
    isBarista: currentUser?.role === ROLES.BARISTA,
    isCuisinier: currentUser?.role === ROLES.CUISINIER,
    isCaissier: currentUser?.role === ROLES.CAISSIER,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
