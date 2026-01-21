-- Allow patients to insert their own profile during signup
CREATE POLICY "Patients can create their own profile" ON public.patients
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow doctors to insert their own profile during signup
CREATE POLICY "Doctors can create their own profile" ON public.doctors
  FOR INSERT WITH CHECK (auth.uid() = user_id);
