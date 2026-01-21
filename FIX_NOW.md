# 🚨 حل سريع لمشكلة Invalid API Key

## خطوة واحدة فقط!

### 📝 أنشئ ملف اسمه `.env` في المجلد:
```
f:\salamtak\.env
```

### 📋 والصق فيه هذا المحتوى:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## 🔑 الحصول على القيم:

### 1. اذهب إلى:
```
https://supabase.com/dashboard
```

### 2. اختر مشروعك

### 3. من القائمة اليسرى: **Settings** (⚙️)

### 4. اضغط على **API**

### 5. انسخ القيمتين:

#### أ) Project URL:
مثال: `https://abcdefghijk.supabase.co`

#### ب) anon public:
مثال: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg4ODg4ODgsImV4cCI6MTk5NDQ2NDg4OH0.xxxxxxxxxxxxxxxxxxxxx`

---

## ✅ مثال كامل لملف `.env` صحيح:

```env
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg4ODg4ODgsImV4cCI6MTk5NDQ2NDg4OH0.xxxxxxxxxxxxxxxxxxxxx
```

---

## 🔄 بعد الحفظ:

### في Terminal:
```bash
# أوقف المشروع (اضغط Ctrl+C)

# شغله مرة أخرى
npm run dev
```

---

## ✅ تحقق من النجاح:

افتح المتصفح على `http://localhost:3000`

افتح Console (اضغط F12)

يجب ألا ترى أي أخطاء عن Supabase!

---

## 🆘 لا زالت المشكلة؟

### تأكد من:

1. ✅ اسم الملف بالضبط: `.env` (وليس `.env.txt` أو `env`)
2. ✅ الملف في المكان الصحيح: `f:\salamtak\.env`
3. ✅ لا توجد مسافات زائدة
4. ✅ أعدت تشغيل المشروع بعد التعديل

---

## 📱 تواصل معي:

إذا لم تحل المشكلة، أرسل لي:
1. Screenshot من ملف `.env`
2. Screenshot من الخطأ في Console
3. Screenshot من Supabase Dashboard → Settings → API

**سأساعدك فوراً! 🚀**
