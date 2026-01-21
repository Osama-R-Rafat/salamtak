# ✅ تحقق من إعداد ملف .env

## المشكلة: "Invalid API Key"

هذا يعني أن ملف `.env` غير صحيح أو غير موجود.

---

## ✅ الحل خطوة بخطوة:

### 1️⃣ تأكد من وجود ملف `.env`

يجب أن يكون في **جذر المشروع** (بجانب `package.json`)

```
salamtak/
├── .env          ← هنا!
├── package.json
├── src/
└── ...
```

### 2️⃣ تأكد من محتوى ملف `.env`

افتح ملف `.env` وتأكد أنه يحتوي على:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxxxxx
```

⚠️ **مهم جداً:**
- لا توجد مسافات قبل أو بعد `=`
- لا توجد علامات تنصيص حول القيم
- يبدأ كل سطر بـ `VITE_`

### 3️⃣ احصل على القيم الصحيحة من Supabase

#### أ) اذهب إلى Supabase Dashboard:
https://supabase.com/dashboard

#### ب) اختر مشروعك

#### ج) اذهب إلى Settings (⚙️) → API

#### د) انسخ القيم:

**Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```

**anon public key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxxx...
```

### 4️⃣ ضع القيم في ملف `.env`

**مثال صحيح:**
```env
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg4ODg4ODgsImV4cCI6MTk5NDQ2NDg4OH0.xxxxxxxxxxxxxxxxxxxxxxxxx
```

**أمثلة خاطئة ❌:**

```env
# خطأ: مسافات
VITE_SUPABASE_URL = https://xxx.supabase.co

# خطأ: علامات تنصيص
VITE_SUPABASE_URL="https://xxx.supabase.co"

# خطأ: بدون VITE_
SUPABASE_URL=https://xxx.supabase.co

# خطأ: سطر فارغ في المفتاح
VITE_SUPABASE_ANON_KEY=eyJhbGci...
...OiJIUzI1NiI
```

---

## 🔧 اختبار الإعداد

### بعد تعديل `.env`:

```bash
# 1. أوقف المشروع (Ctrl+C في Terminal)

# 2. أعد تشغيل المشروع
npm run dev

# 3. افتح المتصفح
http://localhost:3000

# 4. افتح Console (F12)
# يجب ألا ترى رسائل خطأ عن المفاتيح
```

---

## 🎯 تحقق من القيم

افتح المتصفح → Console (F12) → اكتب:

```javascript
console.log(import.meta.env.VITE_SUPABASE_URL);
console.log(import.meta.env.VITE_SUPABASE_ANON_KEY ? 'موجود' : 'غير موجود');
```

**النتيجة المتوقعة:**
```
https://xxxxx.supabase.co
موجود
```

**إذا رأيت `undefined`:**
- ملف `.env` غير موجود في المكان الصحيح
- أو المفاتيح لا تبدأ بـ `VITE_`
- أو تحتاج إعادة تشغيل المشروع

---

## ⚠️ أخطاء شائعة

### 1. ملف `.env` في مكان خاطئ
❌ `src/.env`
✅ `.env` (في جذر المشروع)

### 2. نسيان `VITE_` في البداية
❌ `SUPABASE_URL=...`
✅ `VITE_SUPABASE_URL=...`

### 3. عدم إعادة تشغيل المشروع
بعد تعديل `.env` **يجب** إعادة تشغيل `npm run dev`

### 4. مسافات زائدة
❌ `VITE_SUPABASE_URL = https://xxx.supabase.co`
✅ `VITE_SUPABASE_URL=https://xxx.supabase.co`

### 5. علامات تنصيص
❌ `VITE_SUPABASE_URL="https://xxx.supabase.co"`
✅ `VITE_SUPABASE_URL=https://xxx.supabase.co`

---

## 📝 نموذج `.env` كامل

انسخ هذا والصق في ملف `.env` (مع وضع قيمك الحقيقية):

```env
VITE_SUPABASE_URL=ضع_هنا_Project_URL_من_Supabase
VITE_SUPABASE_ANON_KEY=ضع_هنا_anon_public_key_من_Supabase
```

---

## 🆘 لا زالت المشكلة موجودة؟

### جرب هذا:

```bash
# 1. احذف مجلد node_modules
rm -rf node_modules

# أو على Windows:
rmdir /s node_modules

# 2. احذف ملف package-lock.json
rm package-lock.json

# 3. أعد التثبيت
npm install

# 4. شغل المشروع
npm run dev
```

---

## ✅ التحقق النهائي

بعد الإعداد الصحيح، يجب أن ترى في Console:

```
✅ الاتصال بـ Supabase ناجح!
```

وليس:

```
❌ خطأ: Invalid API key
```

---

**إذا اتبعت هذه الخطوات بالترتيب، سيعمل كل شيء! 🚀**
