// ملف اختبار الاتصال بـ Supabase
import { supabase } from './lib/supabase';

async function testConnection() {
  console.log('🔍 جاري اختبار الاتصال بـ Supabase...');
  
  try {
    // اختبار بسيط للاتصال
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ خطأ في الاتصال:', error.message);
      console.error('تفاصيل الخطأ:', error);
    } else {
      console.log('✅ الاتصال بـ Supabase ناجح!');
      console.log('📊 البيانات:', data);
    }
  } catch (err: any) {
    console.error('❌ خطأ غير متوقع:', err.message);
  }
}

// تشغيل الاختبار
testConnection();
