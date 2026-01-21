import { createClient } from '@supabase/supabase-js';

// قراءة المتغيرات البيئية من ملف .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// التحقق من وجود المفاتيح
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ خطأ: تأكد من وجود VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY في ملف .env');
  console.error('القيم الحالية:');
  console.error('- VITE_SUPABASE_URL:', supabaseUrl || 'غير موجود');
  console.error('- VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'موجود' : 'غير موجود');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface User {
  id: string;
  email: string;
  phone: string;
  full_name: string;
  user_type: 'doctor' | 'patient';
  created_at: string;
}

export interface Doctor {
  id: string;
  user_id: string;
  specialty: string;
  license_number: string;
  years_of_experience: number;
  clinic_address?: string;
  consultation_fee?: number;
  bio?: string;
  rating?: number;
  total_patients?: number;
  created_at: string;
}

export interface Patient {
  id: string;
  user_id: string;
  birth_date: string;
  blood_type?: string;
  height?: number;
  weight?: number;
  chronic_diseases?: string[];
  allergies?: string[];
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  insurance_provider?: string;
  insurance_number?: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  appointment_type: 'clinic' | 'video' | 'followup';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  reason?: string;
  notes?: string;
  created_at: string;
}

export interface Prescription {
  id: string;
  doctor_id: string;
  patient_id: string;
  diagnosis: string;
  medications: Medication[];
  notes?: string;
  created_at: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface MedicationReminder {
  id: string;
  patient_id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  time_slots: string[];
  start_date: string;
  end_date?: string;
  with_food: boolean;
  is_active: boolean;
  created_at: string;
}

export interface Review {
  id: string;
  doctor_id: string;
  patient_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface PatientFile {
  id: string;
  patient_id: string;
  doctor_id: string;
  file_type: 'lab_result' | 'xray' | 'prescription' | 'note' | 'other';
  title: string;
  description?: string;
  file_url?: string;
  content?: any;
  created_at: string;
}
