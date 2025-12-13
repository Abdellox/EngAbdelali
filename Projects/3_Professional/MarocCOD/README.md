# منصة التجارة الإلكترونية المغربية 🇲🇦

منصة تجارة إلكترونية كاملة باللغة العربية مع دعم نظام الدفع عند التسليم (COD)

## المميزات ✨

- ✅ واجهة عربية كاملة مع دعم RTL
- ✅ نظام الدفع عند التسليم (COD)
- ✅ تسجيل الدخول والتسجيل
- ✅ عربة التسوق
- ✅ إدارة المنتجات والتصنيفات
- ✅ نظام الطلبات
- ✅ لوحة تحكم للمدير
- ✅ تصميم متجاوب لجميع الأجهزة

## التقنيات المستخدمة 🛠️

### Backend
- Node.js + Express.js
- MySQL
- JWT للمصادقة
- bcryptjs لتشفير كلمات المرور

### Frontend
- React.js
- React Router
- Axios
- React Icons

## التثبيت والإعداد 📦

### المتطلبات
- Node.js (v14 أو أحدث)
- MySQL (v5.7 أو أحدث)
- npm أو yarn

### خطوات التثبيت

#### 1. استنساخ المشروع
```bash
git clone <repository-url>
cd moroccan-ecommerce-platform
```

#### 2. إعداد قاعدة البيانات
```bash
# تسجيل الدخول إلى MySQL
mysql -u root -p

# تنفيذ ملف SQL
source backend/config/database.sql
```

#### 3. إعداد Backend
```bash
# تثبيت الحزم
npm install

# إنشاء ملف .env
cp .env.example .env

# تعديل ملف .env بمعلومات قاعدة البيانات الخاصة بك
```

#### 4. إعداد Frontend
```bash
cd frontend
npm install
```

## تشغيل المشروع 🚀

### تشغيل Backend
```bash
# من المجلد الرئيسي
npm run dev
```
الخادم سيعمل على: `http://localhost:5000`

### تشغيل Frontend
```bash
# من مجلد frontend
cd frontend
npm start
```
التطبيق سيعمل على: `http://localhost:3000`

## إعداد ملف .env ⚙️

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=moroccan_ecommerce

JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password

FRONTEND_URL=http://localhost:3000
```

## حساب المدير الافتراضي 👤

```
البريد الإلكتروني: admin@example.com
كلمة المرور: admin123
```

**ملاحظة:** يجب تغيير كلمة المرور الافتراضية بعد أول تسجيل دخول

## هيكل المشروع 📁

```
moroccan-ecommerce-platform/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── database.sql
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── categoryController.js
│   │   └── addressController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── addressRoutes.js
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   └── Footer.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Products.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Profile.js
│   │   │   └── AdminDashboard.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## API Endpoints 🔌

### Authentication
- `POST /api/auth/register` - تسجيل مستخدم جديد
- `POST /api/auth/login` - تسجيل الدخول
- `GET /api/auth/me` - الحصول على معلومات المستخدم

### Products
- `GET /api/products` - الحصول على جميع المنتجات
- `GET /api/products/:id` - الحصول على منتج واحد
- `POST /api/products` - إضافة منتج (مدير فقط)
- `PUT /api/products/:id` - تحديث منتج (مدير فقط)
- `DELETE /api/products/:id` - حذف منتج (مدير فقط)

### Categories
- `GET /api/categories` - الحصول على جميع التصنيفات
- `POST /api/categories` - إضافة تصنيف (مدير فقط)

### Orders
- `POST /api/orders` - إنشاء طلب جديد
- `GET /api/orders/my-orders` - طلبات المستخدم
- `GET /api/orders/all` - جميع الطلبات (مدير فقط)
- `GET /api/orders/:id` - تفاصيل طلب
- `PUT /api/orders/:id/status` - تحديث حالة الطلب (مدير فقط)

### Addresses
- `POST /api/addresses` - إضافة عنوان جديد

## الاستضافة 🌐

### استضافة Backend
يمكن استضافة Backend على:
- Heroku
- DigitalOcean
- AWS
- VPS

### استضافة Frontend
يمكن استضافة Frontend على:
- Vercel
- Netlify
- GitHub Pages

## الأمان 🔒

- تشفير كلمات المرور باستخدام bcrypt
- مصادقة JWT
- حماية المسارات
- التحقق من الصلاحيات

## المساهمة 🤝

المساهمات مرحب بها! يرجى فتح Issue أو Pull Request

## الترخيص 📄

MIT License

## الدعم 💬

للدعم والاستفسارات، يرجى التواصل عبر:
- البريد الإلكتروني: support@example.com
- الهاتف: +212 6XX XXX XXX

---

صنع بـ ❤️ في المغرب
