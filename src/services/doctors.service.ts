import { supabase } from '../lib/supabase';

class DoctorsService {
  /**
   * الحصول على جميع الأطباء (Get all doctors)
   */
  async getAllDoctors() {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select(`
          *,
          profile:profiles!doctors_user_id_fkey (*)
        `)
        .order('rating', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Get all doctors error:', error);
      return [];
    }
  }

  /**
   * البحث عن أطباء بالتخصص (Get doctors by specialty)
   */
  async getDoctorsBySpecialty(specialty: string) {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select(`
          *,
          profile:profiles!doctors_user_id_fkey (*)
        `)
        .eq('specialty', specialty)
        .order('rating', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Get doctors by specialty error:', error);
      return [];
    }
  }

  /**
   * الحصول على معلومات طبيب معين (Get doctor by ID)
   */
  async getDoctorById(doctorId: string) {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select(`
          *,
          profile:profiles!doctors_user_id_fkey (*)
        `)
        .eq('id', doctorId)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Get doctor by ID error:', error);
      return null;
    }
  }

  /**
   * الحصول على تقييمات الطبيب (Get doctor reviews)
   */
  async getDoctorReviews(doctorId: string) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          patient:patients!reviews_patient_id_fkey (
            profile:profiles!patients_user_id_fkey (*)
          )
        `)
        .eq('doctor_id', doctorId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Get doctor reviews error:', error);
      return [];
    }
  }

  /**
   * إضافة تقييم للطبيب (Add review for doctor)
   */
  async addDoctorReview(
    doctorId: string,
    patientId: string,
    rating: number,
    comment?: string,
    appointmentId?: string
  ) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          doctor_id: doctorId,
          patient_id: patientId,
          rating,
          comment,
          appointment_id: appointmentId,
        })
        .select()
        .single();

      if (error) throw error;

      // Update doctor's average rating
      await this.updateDoctorRating(doctorId);

      return data;
    } catch (error: any) {
      console.error('Add doctor review error:', error);
      throw error;
    }
  }

  /**
   * تحديث متوسط تقييم الطبيب (Update doctor's average rating)
   */
  private async updateDoctorRating(doctorId: string) {
    try {
      const { data: reviews, error: reviewsError } = await supabase
        .from('reviews')
        .select('rating')
        .eq('doctor_id', doctorId);

      if (reviewsError) throw reviewsError;

      if (reviews && reviews.length > 0) {
        const avgRating =
          reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

        const { error: updateError } = await supabase
          .from('doctors')
          .update({ rating: Number(avgRating.toFixed(2)) })
          .eq('id', doctorId);

        if (updateError) throw updateError;
      }
    } catch (error: any) {
      console.error('Update doctor rating error:', error);
    }
  }

  /**
   * الحصول على التخصصات المتوفرة (Get available specialties)
   */
  async getSpecialties() {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('specialty')
        .order('specialty');

      if (error) throw error;

      // Get unique specialties
      const specialties = [...new Set(data?.map(d => d.specialty) || [])];
      return specialties;
    } catch (error: any) {
      console.error('Get specialties error:', error);
      return [];
    }
  }
}

export const doctorsService = new DoctorsService();
