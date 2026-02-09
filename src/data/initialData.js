// البيانات الأولية - Version 4
// نظام متقدم كامل حسب المواصفات الوظيفية

// العملة
export const currency = {
  code: 'MAD',
  symbol: 'DH',
  name: 'الدرهم المغربي'
};

// حالات الطاولات
export const TABLE_STATUS = {
  EMPTY: 'empty',      // Blanc (khawya) - أبيض
  OCCUPIED: 'occupied', // Rouge (3amra) - أحمر
  RESERVED: 'reserved'  // Bleu (reserve) - أزرق
};

// حالات الطلبات
export const ORDER_STATUS = {
  PENDING: 'pending',           // قيد الانتظار
  IN_PREPARATION: 'in_preparation', // قيد التحضير
  READY: 'ready',               // جاهز
  DELIVERED: 'delivered',       // تم التسليم
  PAID: 'paid',                 // تم الدفع
  VALIDATED: 'validated',       // مؤكد
  REFUSED: 'refused',           // مرفوض
  CANCELLED: 'cancelled'        // ملغى
};

// الأدوار
export const ROLES = {
  SUPERADMIN: 'superadmin',
  SERVEUR: 'serveur',     // نادل
  BARISTA: 'barista',     // باريستا
  CUISINIER: 'cuisinier', // طباخ
  CAISSIER: 'caissier'    // أمين صندوق
};

// طرق الدفع
export const PAYMENT_METHODS = {
  CASH: 'cash',           // نقدي
  CARD: 'card',           // بطاقة
  WALLET: 'wallet',       // محفظة
  TRANSFER: 'transfer'    // تحويل
};

// فئات المنتجات
export const PRODUCT_CATEGORIES = {
  ENTREES: 'entrees',     // مقبلات
  PLATS: 'plats',         // أطباق رئيسية
  BOISSONS: 'boissons',   // مشروبات
  JUS: 'jus',             // عصائر
  DESSERTS: 'desserts'    // حلويات
};

// أنواع الشكاوى
export const COMPLAINT_TYPES = {
  SUGAR_MISSING: 'sugar_missing',     // سكر ناقص
  COLD_DISH: 'cold_dish',             // طبق بارد
  ALLERGY: 'allergy',                 // حساسية
  WRONG_ORDER: 'wrong_order',         // طلب خاطئ
  LONG_WAIT: 'long_wait',             // انتظار طويل
  QUALITY: 'quality',                 // جودة
  OTHER: 'other'                      // أخرى
};

// توليد رقم مرجع فريد للطلب
export const generateOrderRef = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');
  return `SUP-${year}${month}${day}-${random}`;
};

// المستخدمون (تحديث مع الأدوار الجديدة)
export const initialUsers = [
  {
    id: 1,
    username: 'superadmin',
    password: 'admin123',
    name: 'المسؤول الرئيسي',
    role: ROLES.SUPERADMIN,
    email: 'admin@restocafe.ma',
    phone: '0612345678',
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    username: 'serveur1',
    password: 'serveur123',
    name: 'فاطمة الزهراء',
    role: ROLES.SERVEUR,
    email: 'fatima@restocafe.ma',
    phone: '0623456789',
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    username: 'barista1',
    password: 'barista123',
    name: 'يوسف بنعلي',
    role: ROLES.BARISTA,
    email: 'youssef@restocafe.ma',
    phone: '0634567890',
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    username: 'cuisinier1',
    password: 'cuisinier123',
    name: 'محمد العلوي',
    role: ROLES.CUISINIER,
    email: 'mohamed@restocafe.ma',
    phone: '0645678901',
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    username: 'caissier1',
    password: 'caissier123',
    name: 'نادية المرابط',
    role: ROLES.CAISSIER,
    email: 'nadia@restocafe.ma',
    phone: '0656789012',
    active: true,
    createdAt: new Date().toISOString()
  }
];

// الطاولات (محدثة مع الحالات الملونة)
export const initialTables = [
  { id: 1, number: 1, capacity: 4, zone: 'A', status: TABLE_STATUS.EMPTY, x: 50, y: 50, shape: 'square', lastPaidAt: null, currentOrderId: null },
  { id: 2, number: 2, capacity: 2, zone: 'A', status: TABLE_STATUS.OCCUPIED, x: 200, y: 50, shape: 'round', lastPaidAt: null, currentOrderId: 1 },
  { id: 3, number: 3, capacity: 6, zone: 'A', status: TABLE_STATUS.RESERVED, x: 350, y: 50, shape: 'rectangle', lastPaidAt: null, currentOrderId: null, reservedFor: 'أحمد محمد', reservedAt: new Date().toISOString() },
  { id: 4, number: 4, capacity: 4, zone: 'B', status: TABLE_STATUS.EMPTY, x: 50, y: 200, shape: 'square', lastPaidAt: null, currentOrderId: null },
  { id: 5, number: 5, capacity: 8, zone: 'B', status: TABLE_STATUS.OCCUPIED, x: 200, y: 200, shape: 'rectangle', lastPaidAt: null, currentOrderId: 2 },
  { id: 6, number: 6, capacity: 2, zone: 'B', status: TABLE_STATUS.EMPTY, x: 350, y: 200, shape: 'round', lastPaidAt: null, currentOrderId: null },
  { id: 7, number: 7, capacity: 4, zone: 'C', status: TABLE_STATUS.EMPTY, x: 50, y: 350, shape: 'square', lastPaidAt: null, currentOrderId: null },
  { id: 8, number: 8, capacity: 6, zone: 'C', status: TABLE_STATUS.EMPTY, x: 200, y: 350, shape: 'rectangle', lastPaidAt: null, currentOrderId: null },
];

// فئات المنتجات
export const initialCategories = [
  { id: 1, name: 'Entrées', nameAr: 'مقبلات', order: 1, active: true },
  { id: 2, name: 'Plats', nameAr: 'أطباق رئيسية', order: 2, active: true },
  { id: 3, name: 'Boissons', nameAr: 'مشروبات ساخنة', order: 3, active: true },
  { id: 4, name: 'Jus', nameAr: 'عصائر', order: 4, active: true },
  { id: 5, name: 'Desserts', nameAr: 'حلويات', order: 5, active: true },
];

// المنتجات (مع التصنيف حسب الوجهة)
export const initialProducts = [
  // Boissons (إلى Barista)
  { id: 1, name: 'قهوة سوداء', category: 'boissons', categoryId: 3, price: 12, tax: 0.2, image: '☕', active: true, targetRole: ROLES.BARISTA, modifiers: ['بدون سكر', '1 سكر', '2 سكر'] },
  { id: 2, name: 'كابتشينو', category: 'boissons', categoryId: 3, price: 18, tax: 0.2, image: '☕', active: true, targetRole: ROLES.BARISTA, modifiers: ['بدون سكر', '1 سكر', '2 سكر'] },
  { id: 3, name: 'لاتيه', category: 'boissons', categoryId: 3, price: 20, tax: 0.2, image: '☕', active: true, targetRole: ROLES.BARISTA, modifiers: ['بدون سكر', '1 سكر', '2 سكر'] },
  { id: 4, name: 'شاي أخضر', category: 'boissons', categoryId: 3, price: 10, tax: 0.2, image: '🍵', active: true, targetRole: ROLES.BARISTA, modifiers: ['بدون سكر', '1 سكر', '2 سكر'] },
  
  // Jus (إلى Barista)
  { id: 5, name: 'عصير برتقال', category: 'jus', categoryId: 4, price: 15, tax: 0.2, image: '🍊', active: true, targetRole: ROLES.BARISTA, modifiers: [] },
  { id: 6, name: 'عصير تفاح', category: 'jus', categoryId: 4, price: 15, tax: 0.2, image: '🍎', active: true, targetRole: ROLES.BARISTA, modifiers: [] },
  { id: 7, name: 'موهيتو', category: 'jus', categoryId: 4, price: 25, tax: 0.2, image: '🍹', active: true, targetRole: ROLES.BARISTA, modifiers: [] },
  
  // Entrées (إلى Cuisinier)
  { id: 8, name: 'سلطة مغربية', category: 'entrees', categoryId: 1, price: 20, tax: 0.2, image: '🥗', active: true, targetRole: ROLES.CUISINIER, modifiers: [] },
  { id: 9, name: 'حريرة', category: 'entrees', categoryId: 1, price: 15, tax: 0.2, image: '🍲', active: true, targetRole: ROLES.CUISINIER, modifiers: [] },
  
  // Plats (إلى Cuisinier)
  { id: 10, name: 'طاجين دجاج', category: 'plats', categoryId: 2, price: 55, tax: 0.2, image: '🍖', active: true, targetRole: ROLES.CUISINIER, modifiers: [] },
  { id: 11, name: 'كسكس', category: 'plats', categoryId: 2, price: 60, tax: 0.2, image: '🍚', active: true, targetRole: ROLES.CUISINIER, modifiers: [] },
  { id: 12, name: 'برجر', category: 'plats', categoryId: 2, price: 45, tax: 0.2, image: '🍔', active: true, targetRole: ROLES.CUISINIER, modifiers: [] },
  { id: 13, name: 'بيتزا مارغريتا', category: 'plats', categoryId: 2, price: 55, tax: 0.2, image: '🍕', active: true, targetRole: ROLES.CUISINIER, modifiers: [] },
  
  // Desserts (إلى Cuisinier)
  { id: 14, name: 'كعكة شوكولاتة', category: 'desserts', categoryId: 5, price: 25, tax: 0.2, image: '🍰', active: true, targetRole: ROLES.CUISINIER, modifiers: [] },
  { id: 15, name: 'تشيز كيك', category: 'desserts', categoryId: 5, price: 30, tax: 0.2, image: '🍰', active: true, targetRole: ROLES.CUISINIER, modifiers: [] },
];

// الطلبات (مع المراجع الفريدة)
export const initialOrders = [
  {
    id: 1,
    ref: 'SUP-20260209-0001',
    tableId: 2,
    serverId: 2,
    serverName: 'فاطمة الزهراء',
    status: ORDER_STATUS.IN_PREPARATION,
    items: [
      { id: 1, productId: 2, productName: 'كابتشينو', quantity: 2, priceEach: 18, modifiers: ['1 سكر'], targetRole: ROLES.BARISTA },
      { id: 2, productId: 10, productName: 'طاجين دجاج', quantity: 1, priceEach: 55, modifiers: [], targetRole: ROLES.CUISINIER }
    ],
    subtotal: 91,
    tax: 18.2,
    total: 109.2,
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    updatedAt: new Date().toISOString(),
    notes: ''
  },
  {
    id: 2,
    ref: 'SUP-20260209-0002',
    tableId: 5,
    serverId: 2,
    serverName: 'فاطمة الزهراء',
    status: ORDER_STATUS.READY,
    items: [
      { id: 3, productId: 11, productName: 'كسكس', quantity: 2, priceEach: 60, modifiers: [], targetRole: ROLES.CUISINIER },
      { id: 4, productId: 5, productName: 'عصير برتقال', quantity: 2, priceEach: 15, modifiers: [], targetRole: ROLES.BARISTA }
    ],
    subtotal: 150,
    tax: 30,
    total: 180,
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
    updatedAt: new Date().toISOString(),
    notes: ''
  }
];

// المعاملات
export const initialTransactions = [
  {
    id: 1,
    orderId: 2,
    orderRef: 'SUP-20260209-0002',
    amount: 180,
    method: PAYMENT_METHODS.CASH,
    cashierId: 5,
    cashierName: 'نادية المرابط',
    createdAt: new Date(Date.now() - 5 * 60000).toISOString()
  }
];

// الشكاوى
export const initialComplaints = [
  {
    id: 1,
    orderId: 1,
    orderRef: 'SUP-20260209-0001',
    authorId: 2,
    authorName: 'فاطمة الزهراء',
    authorRole: ROLES.SERVEUR,
    type: COMPLAINT_TYPES.SUGAR_MISSING,
    description: 'العميل طلب بدون سكر ولكن تم إضافة سكر',
    status: 'open',
    createdAt: new Date(Date.now() - 10 * 60000).toISOString(),
    resolvedAt: null,
    resolution: null
  }
];

// سجل التدقيق
export const initialAuditLogs = [];

// دالة تنسيق السعر
export const formatPrice = (price) => {
  return `${parseFloat(price).toFixed(2)} ${currency.symbol}`;
};

// دالة الحصول على البيانات
export const getData = (key) => {
  const stored = localStorage.getItem(`v4_${key}`);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(`Error parsing ${key}:`, e);
    }
  }
  
  // البيانات الافتراضية
  const defaults = {
    users: initialUsers,
    tables: initialTables,
    categories: initialCategories,
    products: initialProducts,
    orders: initialOrders,
    transactions: initialTransactions,
    complaints: initialComplaints,
    auditLogs: initialAuditLogs
  };
  
  return defaults[key] || [];
};

// دالة حفظ البيانات
export const saveData = (key, data) => {
  localStorage.setItem(`v4_${key}`, JSON.stringify(data));
};

// دالة إضافة سجل تدقيق
export const addAuditLog = (userId, action, details) => {
  const logs = getData('auditLogs');
  const newLog = {
    id: logs.length + 1,
    userId,
    action,
    details,
    timestamp: new Date().toISOString()
  };
  logs.push(newLog);
  saveData('auditLogs', logs);
  return newLog;
};

export default {
  currency,
  TABLE_STATUS,
  ORDER_STATUS,
  ROLES,
  PAYMENT_METHODS,
  PRODUCT_CATEGORIES,
  COMPLAINT_TYPES,
  generateOrderRef,
  formatPrice,
  getData,
  saveData,
  addAuditLog
};
