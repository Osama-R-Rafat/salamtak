# دليل إعداد نظام سلامتك الطبي
# Salamtak Medical System Setup Guide

## المتطلبات الأساسية | Prerequisites

- Node.js (الإصدار 18 أو أحدث | version 18 or later)
- حساب Supabase مجاني | Free Supabase account

---

## الخطوة 1: إنشاء مشروع Supabase | Step 1: Create Supabase Project

### 1. إنشاء حساب | Create Account
1. اذهب إلى [supabase.com](https://supabase.com)
2. قم بإنشاء حساب مجاني | Create a free account
3. انقر على "New Project" | Click "New Project"
4. اختر اسم للمشروع وكلمة مرور قوية لقاعدة البيانات
   Choose a project name and strong database password

### 2. إعداد قاعدة البيانات | Setup Database

1. بعد إنشاء المشروع، اذهب إلى **SQL Editor**
   After creating the project, go to **SQL Editor**

2. افتح ملف `database.sql` من المشروع وانسخ محتوياته
   Open the `database.sql` file from the project and copy its contents

3. الصق المحتوى في SQL Editor واضغط "Run"
   Paste the content into SQL Editor and click "Run"

4. انتظر حتى يتم تنفيذ جميع الأوامر بنجاح
   Wait until all commands execute successfully

### 3. الحصول على مفاتيح API | Get API Keys

1. اذهب إلى **Settings** → **API**
   Go to **Settings** → **API**

2. ستجد القيم التالية:
   You'll find the following values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Anon/Public Key**: `eyJhbGci...`

3. احتفظ بهذه المفاتيح بشكل آمن
   Keep these keys secure

---

## الخطوة 2: إعداد المشروع المحلي | Step 2: Setup Local Project

### 1. تثبيت المكتبات | Install Dependencies

```bash
npm install
```

### 2. إنشاء ملف المتغيرات البيئية | Create Environment File

1. في جذر المشروع، أنشئ ملف باسم `.env`
   In the project root, create a file named `.env`

2. انسخ المحتوى من `env-template.txt` وضع قيمك الخاصة:
   Copy the content from `env-template.txt` and add your values:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**⚠️ مهم جداً | Very Important:**
- لا تشارك ملف `.env` مع أحد
  Don't share the `.env` file with anyone
- ملف `.env` مُضاف بالفعل إلى `.gitignore`
  The `.env` file is already added to `.gitignore`

---

## الخطوة 3: تشغيل المشروع | Step 3: Run the Project

### التشغيل للتطوير | Development Mode

```bash
npm run dev
```

سيعمل المشروع على: `http://localhost:5173`
The project will run on: `http://localhost:5173`

### البناء للإنتاج | Production Build

```bash
npm run build
```

---

## الخطوة 4: اختبار النظام | Step 4: Test the System

### تسجيل طبيب جديد | Register New Doctor

1. افتح التطبيق في المتصفح
   Open the app in browser

2. اختر "أنا طبيب" | Choose "I am a Doctor"

3. انقر "ليس لديك حساب؟ سجل الآن"
   Click "Don't have an account? Register"

4. املأ النموذج:
   Fill the form:
   - الاسم الكامل | Full Name
   - البريد الإلكتروني | Email
   - التخصص | Specialty
   - رقم الترخيص | License Number
   - كلمة المرور | Password

5. اضغط "إنشاء الحساب"
   Click "Create Account"

### تسجيل مريض جديد | Register New Patient

1. اختر "أنا مريض" | Choose "I am a Patient"

2. انقر "ليس لديك حساب؟ سجل الآن"
   Click "Don't have an account? Register"

3. املأ النموذج:
   Fill the form:
   - الاسم الكامل | Full Name
   - رقم الهاتف | Phone Number
   - البريد الإلكتروني | Email
   - تاريخ الميلاد | Birth Date
   - كلمة المرور | Password

4. اضغط "تسجيل"
   Click "Register"

---

## هيكل قاعدة البيانات | Database Structure

### الجداول الرئيسية | Main Tables

1. **profiles** - معلومات المستخدمين الأساسية | User basic information
2. **doctors** - معلومات الأطباء | Doctor information
3. **patients** - معلومات المرضى | Patient information
4. **appointments** - المواعيد الطبية | Medical appointments
5. **prescriptions** - الوصفات الطبية | Medical prescriptions
6. **medication_reminders** - تذكيرات الأدوية | Medication reminders
7. **reviews** - تقييمات الأطباء | Doctor reviews
8. **patient_files** - ملفات المرضى | Patient files

### سياسات الأمان | Security Policies

- تم تفعيل Row Level Security (RLS) على جميع الجداول
  Row Level Security (RLS) is enabled on all tables

- كل مستخدم يمكنه فقط رؤية وتعديل بياناته الخاصة
  Each user can only view and edit their own data

- الأطباء يمكنهم رؤية بيانات مرضاهم فقط
  Doctors can only view their patients' data

---

## الميزات المتاحة | Available Features

### للمرضى | For Patients
✅ حجز المواعيد مع الأطباء | Book appointments with doctors
✅ تذكيرات الأدوية | Medication reminders
✅ طلب الأدوية من الصيدلية | Order medications from pharmacy
✅ الاستشارات المرئية | Video consultations
✅ عرض الوصفات الطبية | View prescriptions
✅ تقييم الأطباء | Rate doctors

### للأطباء | For Doctors
✅ إدارة المواعيد | Manage appointments
✅ كتابة الوصفات الطبية | Write prescriptions
✅ عرض ملفات المرضى | View patient files
✅ الاستشارات المرئية | Video consultations
✅ إحصائيات شاملة | Comprehensive statistics

---

## حل المشاكل الشائعة | Troubleshooting

### خطأ في الاتصال بقاعدة البيانات | Database Connection Error

```
Error: Invalid Supabase URL
```

**الحل | Solution:**
- تأكد من أن ملف `.env` موجود في جذر المشروع
  Make sure the `.env` file exists in the project root
- تحقق من صحة `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY`
  Verify the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct

### خطأ في التسجيل | Registration Error

```
Error: Email already registered
```

**الحل | Solution:**
- استخدم بريد إلكتروني مختلف
  Use a different email address
- أو قم بتسجيل الدخول بالبريد الموجود
  Or login with the existing email

### خطأ في الأذونات | Permission Error

```
Error: new row violates row-level security policy
```

**الحل | Solution:**
- تأكد من تنفيذ ملف `database.sql` بالكامل في Supabase
  Make sure you executed the entire `database.sql` file in Supabase
- تحقق من سياسات RLS في Supabase Dashboard
  Check RLS policies in Supabase Dashboard

---

## نشر المشروع | Deployment

### على Vercel

1. ادفع المشروع إلى GitHub
   Push the project to GitHub

2. اذهب إلى [vercel.com](https://vercel.com)
   Go to [vercel.com](https://vercel.com)

3. استورد المشروع من GitHub
   Import the project from GitHub

4. أضف المتغيرات البيئية:
   Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

5. اضغط "Deploy"

### على Netlify

1. ادفع المشروع إلى GitHub
   Push the project to GitHub

2. اذهب إلى [netlify.com](https://netlify.com)
   Go to [netlify.com](https://netlify.com)

3. استورد المشروع من GitHub
   Import the project from GitHub

4. في Build Settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

5. أضف المتغيرات البيئية في Environment Variables
   Add environment variables in Environment Variables

6. اضغط "Deploy"

---

## الدعم الفني | Technical Support

إذا واجهت أي مشاكل:
If you encounter any problems:

1. تأكد من اتباع جميع الخطوات بالترتيب
   Make sure you followed all steps in order

2. تحقق من console في المتصفح للأخطاء
   Check the browser console for errors

3. تحقق من Supabase Dashboard → Logs
   Check Supabase Dashboard → Logs

4. راجع ملف `database.sql` للتأكد من تنفيذه بالكامل
   Review the `database.sql` file to ensure it's fully executed

---

## ملاحظات مهمة | Important Notes

⚠️ **للاستخدام الفعلي | For Production Use:**

1. غيّر كلمات المرور الافتراضية
   Change default passwords

2. فعّل التحقق بخطوتين في Supabase
   Enable two-factor authentication in Supabase

3. قم بعمل نسخ احتياطية منتظمة لقاعدة البيانات
   Make regular database backups

4. راجع سياسات الأمان بانتظام
   Review security policies regularly

5. استخدم HTTPS دائماً في الإنتاج
   Always use HTTPS in production

---

## الترخيص | License

هذا المشروع مفتوح المصدر للاستخدام التعليمي
This project is open source for educational purposes

---

**مبروك! 🎉 نظام سلامتك الطبي جاهز للاستخدام**
**Congratulations! 🎉 Your Salamtak Medical System is ready to use**
