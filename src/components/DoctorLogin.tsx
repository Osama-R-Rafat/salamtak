import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowRight, User, Mail, Lock } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { toast } from "sonner";

interface DoctorLoginProps {
  onBack: () => void;
  onLogin: () => void;
}

export function DoctorLogin({ onBack, onLogin }: DoctorLoginProps) {
  const { t, dir, language, signIn, signUp } = useApp();
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isRegistering) {
        if (!specialty) {
          toast.error(language === 'ar' ? 'يرجى اختيار التخصص' : 'Please select a specialty');
          setLoading(false);
          return;
        }
        
        await signUp({
          email,
          password,
          phone: licenseNumber, // Using license number as unique identifier
          fullName,
          userType: 'doctor',
          specialty,
          licenseNumber,
        });
        toast.success(language === 'ar' ? 'تم إنشاء الحساب بنجاح' : 'Account created successfully');
        onLogin();
      } else {
        await signIn(email, password);
        toast.success(language === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Signed in successfully');
        onLogin();
      }
    } catch (error: any) {
      toast.error(error.message || (language === 'ar' ? 'حدث خطأ، حاول مرة أخرى' : 'An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 flex items-center justify-center p-3 sm:p-4" dir={dir}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2 pb-4 sm:pb-6">
          <Button 
            variant="ghost" 
            className="self-start p-0 h-auto text-sm"
            onClick={onBack}
            type="button"
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            {t('action.back')}
          </Button>
          <CardTitle className="text-xl sm:text-2xl mt-2 sm:mt-4">
            {isRegistering ? (language === 'ar' ? "تسجيل طبيب جديد" : "New Doctor Registration") : (language === 'ar' ? 'تسجيل دخول الطبيب' : 'Doctor Login')}
          </CardTitle>
          <CardDescription className="text-sm">
            {isRegistering 
              ? (language === 'ar' ? "املأ البيانات المطلوبة للانضمام إلى فريقنا الطبي" : "Fill the required data to join our medical team")
              : (language === 'ar' ? "ادخل بياناتك للوصول إلى لوحة التحكم" : "Enter your credentials to access the dashboard")
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
            {isRegistering ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="doctor-name">{t('register.name')}</Label>
                  <div className="relative">
                    <User className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-3 h-4 w-4 text-muted-foreground`} />
                    <Input 
                      id="doctor-name" 
                      placeholder={language === 'ar' ? 'د. أحمد محمد' : 'Dr. Ahmed Mohamed'} 
                      className={dir === 'rtl' ? 'pr-10' : 'pl-10'}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="doctor-email">{t('register.email')}</Label>
                  <div className="relative">
                    <Mail className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-3 h-4 w-4 text-muted-foreground`} />
                    <Input 
                      id="doctor-email" 
                      type="email" 
                      placeholder="doctor@example.com" 
                      className={dir === 'rtl' ? 'pr-10' : 'pl-10'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialty">{language === 'ar' ? 'التخصص' : 'Specialty'}</Label>
                  <Select value={specialty} onValueChange={setSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'ar' ? 'اختر التخصص' : 'Select specialty'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">{language === 'ar' ? 'أمراض القلب' : 'Cardiology'}</SelectItem>
                      <SelectItem value="dermatology">{language === 'ar' ? 'الجلدية' : 'Dermatology'}</SelectItem>
                      <SelectItem value="orthopedics">{language === 'ar' ? 'العظام' : 'Orthopedics'}</SelectItem>
                      <SelectItem value="pediatrics">{language === 'ar' ? 'الأطفال' : 'Pediatrics'}</SelectItem>
                      <SelectItem value="neurology">{language === 'ar' ? 'المخ والأعصاب' : 'Neurology'}</SelectItem>
                      <SelectItem value="general">{language === 'ar' ? 'الطب العام' : 'General Medicine'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="license">{language === 'ar' ? 'رقم الترخيص الطبي' : 'Medical License Number'}</Label>
                  <Input 
                    id="license" 
                    type="text" 
                    placeholder={language === 'ar' ? 'رقم الترخيص' : 'License number'}
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="doctor-password">{t('register.password')}</Label>
                  <div className="relative">
                    <Lock className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-3 h-4 w-4 text-muted-foreground`} />
                    <Input 
                      id="doctor-password" 
                      type="password" 
                      placeholder="********" 
                      className={dir === 'rtl' ? 'pr-10' : 'pl-10'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('login.email')}</Label>
                  <div className="relative">
                    <Mail className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-3 h-4 w-4 text-muted-foreground`} />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="doctor@example.com" 
                      className={dir === 'rtl' ? 'pr-10' : 'pl-10'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">{t('login.password')}</Label>
                  <div className="relative">
                    <Lock className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-3 h-4 w-4 text-muted-foreground`} />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="********" 
                      className={dir === 'rtl' ? 'pr-10' : 'pl-10'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            )}
            
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? (language === 'ar' ? 'جاري التحميل...' : 'Loading...') : (isRegistering ? (language === 'ar' ? 'إنشاء الحساب' : 'Create Account') : t('login.submit'))}
            </Button>
            
            <div className="text-center">
              <Button 
                variant="link" 
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-sm"
                type="button"
              >
                {isRegistering 
                  ? (language === 'ar' ? 'لديك حساب بالفعل؟ سجل دخولك' : 'Already have an account? Login')
                  : (language === 'ar' ? 'ليس لديك حساب؟ سجل الآن' : 'Don\'t have an account? Register')
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
