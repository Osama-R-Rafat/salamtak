import { supabase } from '../lib/supabase';

export interface SignUpData {
  email: string;
  password: string;
  phone: string;
  fullName: string;
  userType: 'doctor' | 'patient';
  // For doctors
  specialty?: string;
  licenseNumber?: string;
  // For patients
  birthDate?: string;
}

export interface SignInData {
  email?: string;
  phone?: string;
  password: string;
}

export interface DoctorProfile {
  specialty: string;
  licenseNumber: string;
  yearsOfExperience?: number;
  clinicAddress?: string;
  consultationFee?: number;
  bio?: string;
}

export interface PatientProfile {
  birthDate: string;
  bloodType?: string;
  height?: number;
  weight?: number;
  chronicDiseases?: string[];
  allergies?: string[];
}

class AuthService {
  /**
   * تسجيل مستخدم جديد (Sign up new user)
   */
  async signUp(data: SignUpData) {
    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            user_type: data.userType,
            phone: data.phone,
          },
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('User creation failed');

      // 2. Update profile with phone
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ phone: data.phone })
        .eq('id', authData.user.id);

      if (profileError) throw profileError;

      // 3. Create doctor or patient profile
      if (data.userType === 'doctor' && data.specialty && data.licenseNumber) {
        const { error: doctorError } = await supabase.from('doctors').insert({
          user_id: authData.user.id,
          specialty: data.specialty,
          license_number: data.licenseNumber,
        });

        if (doctorError) throw doctorError;
      } else if (data.userType === 'patient' && data.birthDate) {
        const { error: patientError } = await supabase.from('patients').insert({
          user_id: authData.user.id,
          birth_date: data.birthDate,
        });

        if (patientError) throw patientError;
      }

      return { user: authData.user, session: authData.session };
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  /**
   * تسجيل الدخول (Sign in)
   */
  async signIn(data: SignInData) {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email || '',
        password: data.password,
      });

      if (error) throw error;

      return { user: authData.user, session: authData.session };
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  /**
   * تسجيل الخروج (Sign out)
   */
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  /**
   * الحصول على المستخدم الحالي (Get current user)
   */
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    } catch (error: any) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  /**
   * الحصول على الجلسة الحالية (Get current session)
   */
  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    } catch (error: any) {
      console.error('Get session error:', error);
      return null;
    }
  }

  /**
   * الحصول على ملف المستخدم الكامل (Get user profile)
   */
  async getUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Get user profile error:', error);
      return null;
    }
  }

  /**
   * الحصول على ملف الطبيب (Get doctor profile)
   */
  async getDoctorProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select(`
          *,
          profiles:user_id (*)
        `)
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Get doctor profile error:', error);
      return null;
    }
  }

  /**
   * الحصول على ملف المريض (Get patient profile)
   */
  async getPatientProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select(`
          *,
          profiles:user_id (*)
        `)
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Get patient profile error:', error);
      return null;
    }
  }

  /**
   * تحديث ملف الطبيب (Update doctor profile)
   */
  async updateDoctorProfile(userId: string, data: Partial<DoctorProfile>) {
    try {
      const { error } = await supabase
        .from('doctors')
        .update(data)
        .eq('user_id', userId);

      if (error) throw error;
      return true;
    } catch (error: any) {
      console.error('Update doctor profile error:', error);
      throw error;
    }
  }

  /**
   * تحديث ملف المريض (Update patient profile)
   */
  async updatePatientProfile(userId: string, data: Partial<PatientProfile>) {
    try {
      const { error } = await supabase
        .from('patients')
        .update(data)
        .eq('user_id', userId);

      if (error) throw error;
      return true;
    } catch (error: any) {
      console.error('Update patient profile error:', error);
      throw error;
    }
  }

  /**
   * الاستماع لتغييرات حالة المصادقة (Listen to auth state changes)
   */
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}

export const authService = new AuthService();
