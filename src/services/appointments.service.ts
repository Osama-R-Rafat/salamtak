import { supabase } from '../lib/supabase';
import type { Appointment } from '../lib/supabase';

export interface CreateAppointmentData {
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: 'clinic' | 'video' | 'followup';
  reason?: string;
}

class AppointmentsService {
  /**
   * إنشاء موعد جديد (Create new appointment)
   */
  async createAppointment(data: CreateAppointmentData) {
    try {
      const { data: appointment, error } = await supabase
        .from('appointments')
        .insert({
          patient_id: data.patientId,
          doctor_id: data.doctorId,
          appointment_date: data.appointmentDate,
          appointment_time: data.appointmentTime,
          appointment_type: data.appointmentType,
          reason: data.reason,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;
      return appointment;
    } catch (error: any) {
      console.error('Create appointment error:', error);
      throw error;
    }
  }

  /**
   * الحصول على مواعيد المريض (Get patient appointments)
   */
  async getPatientAppointments(patientId: string) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          doctor:doctors!appointments_doctor_id_fkey (
            *,
            profile:profiles!doctors_user_id_fkey (*)
          )
        `)
        .eq('patient_id', patientId)
        .order('appointment_date', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Get patient appointments error:', error);
      return [];
    }
  }

  /**
   * الحصول على مواعيد الطبيب (Get doctor appointments)
   */
  async getDoctorAppointments(doctorId: string) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          patient:patients!appointments_patient_id_fkey (
            *,
            profile:profiles!patients_user_id_fkey (*)
          )
        `)
        .eq('doctor_id', doctorId)
        .order('appointment_date', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Get doctor appointments error:', error);
      return [];
    }
  }

  /**
   * تحديث حالة الموعد (Update appointment status)
   */
  async updateAppointmentStatus(
    appointmentId: string,
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  ) {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', appointmentId);

      if (error) throw error;
      return true;
    } catch (error: any) {
      console.error('Update appointment status error:', error);
      throw error;
    }
  }

  /**
   * حذف موعد (Delete appointment)
   */
  async deleteAppointment(appointmentId: string) {
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', appointmentId);

      if (error) throw error;
      return true;
    } catch (error: any) {
      console.error('Delete appointment error:', error);
      throw error;
    }
  }

  /**
   * الحصول على المواعيد اليوم (Get today's appointments)
   */
  async getTodayAppointments(doctorId: string) {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          patient:patients!appointments_patient_id_fkey (
            *,
            profile:profiles!patients_user_id_fkey (*)
          )
        `)
        .eq('doctor_id', doctorId)
        .eq('appointment_date', today)
        .order('appointment_time', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Get today appointments error:', error);
      return [];
    }
  }
}

export const appointmentsService = new AppointmentsService();
