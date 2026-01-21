# 🏥 نظام سلامتك الطبي | Salamtak Medical System

<div align="center">

![Salamtak](https://img.shields.io/badge/نظام-سلامتك-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)

**منصة طبية متكاملة تربط الأطباء والمرضى بتقنيات حديثة وتجربة استثنائية**

**A complete medical platform connecting doctors and patients with modern technology**

[🚀 البدء السريع](#-البدء-السريع) • 
[📖 الوثائق](#-الوثائق) • 
[✨ الميزات](#-الميزات) • 
[🛠️ التقنيات](#️-التقنيات)

</div>

---

## 🎯 نظرة عامة | Overview

نظام سلامتك هو منصة طبية شاملة توفر:

**For Patients (للمرضى):**
- 📅 حجز المواعيد مع الأطباء
- 💊 تذكيرات الأدوية الذكية
- 🎥 استشارات طبية مرئية
- 📱 متابعة صحية شاملة
- ⭐ تقييم الأطباء

**For Doctors (للأطباء):**
- 👥 إدارة ملفات المرضى
- 📝 كتابة الوصفات الطبية الرقمية
- 📊 إحصائيات وتقارير متقدمة
- 🎥 استشارات طبية عن بُعد
- 📆 جدولة المواعيد

---

## 🚀 البدء السريع | Quick Start

### المتطلبات | Prerequisites

- Node.js 18+ 
- حساب Supabase مجاني | Free Supabase account

### التثبيت | Installation

```bash
# 1. استنساخ المشروع | Clone the project
git clone https://github.com/yourusername/salamtak.git
cd salamtak

# 2. تثبيت المكتبات | Install dependencies
npm install

# 3. إعداد قاعدة البيانات | Setup database
# اتبع التعليمات في DATABASE_SETUP_AR.md
# Follow instructions in SETUP_GUIDE.md

# 4. إنشاء ملف البيئة | Create environment file
# انسخ من env-template.txt
# Copy from env-template.txt
cp env-template.txt .env

# 5. تشغيل المشروع | Run the project
npm run dev
```

**📖 للحصول على دليل مفصل:**
- العربية: اقرأ [DATABASE_SETUP_AR.md](./DATABASE_SETUP_AR.md)
- English: Read [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## ✨ الميزات | Features

### 🏥 للمرضى | Patient Features

| الميزة | Feature | الوصف | Description |
|--------|---------|-------|-------------|
| 📅 | Appointments | حجز مواعيد مع الأطباء | Book appointments with doctors |
| 💊 | Medications | تذكيرات ذكية للأدوية | Smart medication reminders |
| 🎥 | Video Calls | استشارات مرئية فورية | Instant video consultations |
| 📋 | Records | سجل طبي شامل | Comprehensive medical records |
| ⭐ | Reviews | تقييم الأطباء | Rate and review doctors |
| 🏪 | Pharmacy | طلب الأدوية | Order medications |

### 👨‍⚕️ للأطباء | Doctor Features

| الميزة | Feature | الوصف | Description |
|--------|---------|-------|-------------|
| 👥 | Patients | إدارة ملفات المرضى | Manage patient files |
| 📝 | Prescriptions | روشتات رقمية | Digital prescriptions |
| 📊 | Statistics | تقارير وإحصائيات | Reports and statistics |
| 📆 | Schedule | جدولة المواعيد | Appointment scheduling |
| 🎥 | Consultations | استشارات عن بُعد | Remote consultations |

---

## 🛠️ التقنيات | Technologies

### Frontend
- ⚛️ **React 18** - مكتبة واجهة المستخدم
- 🔷 **TypeScript** - للكود الآمن والموثوق
- 🎨 **Tailwind CSS** - تصميم عصري ومتجاوب
- 🎭 **Radix UI** - مكونات واجهة متقدمة
- 🔔 **Sonner** - إشعارات جميلة

### Backend & Database
- 🗄️ **Supabase** - قاعدة بيانات PostgreSQL
- 🔐 **Supabase Auth** - مصادقة آمنة
- 🔒 **Row Level Security** - حماية البيانات

### Development Tools
- ⚡ **Vite** - أداة بناء سريعة
- 📦 **npm** - إدارة الحزم

---

## 📁 هيكل المشروع | Project Structure

```
salamtak/
├── src/
│   ├── components/          # مكونات واجهة المستخدم
│   │   ├── ui/             # مكونات Radix UI
│   │   ├── PatientLogin.tsx
│   │   ├── DoctorLogin.tsx
│   │   └── ...
│   ├── contexts/           # React Contexts
│   │   └── AppContext.tsx
│   ├── services/           # خدمات قاعدة البيانات
│   │   ├── auth.service.ts
│   │   ├── appointments.service.ts
│   │   └── ...
│   ├── lib/               # المكتبات المساعدة
│   │   └── supabase.ts
│   └── ...
├── database.sql           # سكريبت قاعدة البيانات
├── .env                   # المتغيرات البيئية (لا تشاركها!)
└── ...
```

---

## 🗄️ قاعدة البيانات | Database Schema

### الجداول الرئيسية | Main Tables

```sql
profiles          # معلومات المستخدمين
doctors           # بيانات الأطباء
patients          # بيانات المرضى
appointments      # المواعيد الطبية
prescriptions     # الوصفات الطبية
medication_reminders  # تذكيرات الأدوية
reviews           # تقييمات الأطباء
patient_files     # ملفات المرضى
```

**للتفاصيل الكاملة:** انظر [database.sql](./database.sql)

---

## 🔐 الأمان | Security

- ✅ Row Level Security (RLS) مفعّل على جميع الجداول
- ✅ كل مستخدم يرى بياناته فقط
- ✅ الأطباء يرون بيانات مرضاهم فقط
- ✅ كلمات المرور مشفرة
- ✅ جلسات آمنة مع JWT tokens

---

## 📖 الوثائق | Documentation

| ملف | File | الوصف | Description |
|-----|------|-------|-------------|
| [DATABASE_SETUP_AR.md](./DATABASE_SETUP_AR.md) | دليل الإعداد بالعربية | Arabic setup guide |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | دليل الإعداد بالإنجليزية | English setup guide |
| [database.sql](./database.sql) | سكريبت قاعدة البيانات | Database schema |

---

## 🚀 النشر | Deployment

### Vercel (موصى به | Recommended)

```bash
# 1. ادفع إلى GitHub | Push to GitHub
git push origin main

# 2. اذهب إلى vercel.com
# 3. استورد المشروع | Import project
# 4. أضف المتغيرات البيئية | Add environment variables
# 5. انشر! | Deploy!
```

### Netlify

```bash
# 1. ادفع إلى GitHub | Push to GitHub
# 2. اذهب إلى netlify.com
# 3. استورد المشروع | Import project
# 4. Build: npm run build
# 5. Publish: dist
# 6. أضف المتغيرات البيئية | Add env vars
```

---

## 🎨 لقطات الشاشة | Screenshots

### الصفحة الرئيسية | Home Page
<div align="center">
<img src="https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Salamtak+Home+Page" alt="Home" />
</div>

### لوحة المريض | Patient Dashboard
<div align="center">
<img src="https://via.placeholder.com/800x400/10B981/FFFFFF?text=Patient+Dashboard" alt="Patient" />
</div>

### لوحة الطبيب | Doctor Dashboard
<div align="center">
<img src="https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Doctor+Dashboard" alt="Doctor" />
</div>

---

## 🤝 المساهمة | Contributing

نرحب بالمساهمات! إذا كنت تريد المساعدة:

1. Fork المشروع
2. أنشئ فرع للميزة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للفرع (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

---

## 📝 الترخيص | License

هذا المشروع مفتوح المصدر للاستخدام التعليمي

This project is open source for educational purposes

---

## 💬 الدعم | Support

إذا واجهت أي مشاكل أو لديك أسئلة:

- 📧 البريد: your-email@example.com
- 🐛 المشاكل: [GitHub Issues](https://github.com/yourusername/salamtak/issues)
- 📖 الوثائق: [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## ✨ المميزات القادمة | Upcoming Features

- [ ] 📱 تطبيق موبايل (React Native)
- [ ] 🔔 إشعارات Push
- [ ] 📊 تقارير تحليلية متقدمة
- [ ] 🌐 دعم لغات إضافية
- [ ] 💳 بوابة دفع إلكتروني
- [ ] 🤖 مساعد ذكي بالذكاء الاصطناعي

---

<div align="center">

**صنع بـ ❤️ في مصر**

**Made with ❤️ in Egypt**

### 🎉 استمتع باستخدام نظام سلامتك!

### 🎉 Enjoy using Salamtak System!

</div>
