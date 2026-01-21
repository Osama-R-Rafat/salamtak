import { supabase } from '../lib/supabase';
import type { Medication } from '../lib/supabase';

export interface CreatePrescriptionData {
  doctorId: string;
  patientId: string;
  appointmentId?: string;
  diagnosis: string;
  medications: Medication[];
  notes?: string;
}

class PrescriptionsService {
  /**
   * إنشاء وصفة طبية جديدة (Create new prescription)
   */
  async createPrescription(data: CreatePrescriptionData) {
    try {
      const { data: prescription, error } = await supabase
        .from('prescriptions')
        .insert({
          doctor_id: data.doctorId,
          patient_id: data.patientId,
          appointment_id: data.appointmentId,
          diagnosis: data.diagnosis,
          medications: data.medications,
          notes: data.notes,
        })
        .select()
        .single();

      if (error) throw error;
      return prescription;
    } catch (error: any) {
      console.error('Create prescription error:', error);
      throw error;
    }
  }

  /**
   * الحصول على وصفات المريض (Get patient prescriptions)
   */
  async getPatientPrescriptions(patientId: string) {
    try {
      const { data, error } = await supabase
        .from('prescriptions')
        .select(`
          *,
          doctor:doctors!prescriptions_doctor_id_fkey (
            *,
            profile:profiles!doctors_user_id_fkey (*)
          )
        `)
        .eq('patient_id', patientId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Get patient prescriptions error:', error);
      return [];
    }
  }

  /**
   * الحصول على وصفات الطبيب (Get doctor prescriptions)
   */
  async getDoctorPrescriptions(doctorId: string) {
    try {
      const { data, error } = await supabase
        .from('prescriptions')
        .select(`
          *,
          patient:patients!prescriptions_patient_id_fkey (
            *,
            profile:profiles!patients_user_id_fkey (*)
          )
        `)
        .eq('doctor_id', doctorId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Get doctor prescriptions error:', error);
      return [];
    }
  }

  /**
   * الحصول على وصفة معينة (Get prescription by ID)
   */
  async getPrescriptionById(prescriptionId: string) {
    try {
      const { data, error } = await supabase
        .from('prescriptions')
        .select(`
          *,
          doctor:doctors!prescriptions_doctor_id_fkey (
            *,
            profile:profiles!doctors_user_id_fkey (*)
          ),
          patient:patients!prescriptions_patient_id_fkey (
            *,
            profile:profiles!patients_user_id_fkey (*)
          )
        `)
        .eq('id', prescriptionId)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Get prescription error:', error);
      return null;
    }
  }
}

export const prescriptionsService = new PrescriptionsService();
