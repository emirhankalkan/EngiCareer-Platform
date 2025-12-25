import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Checkbox } from '../components/ui/Checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { ChevronRight, CheckCircle2, ArrowLeft } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [activeTab, setActiveTab] = useState('candidate');
  const [step, setStep] = useState(1); // 1: Personal, 2: Professional

  // Form State
  const [formData, setFormData] = useState({
      name: '',
      surname: '',
      email: '',
      password: '',
      companyName: '',
      taxNumber: '', // F-REQ-002: Vergi numarası
      positions: [], // Selected positions (Array)
      skills: []
  });

  const [error, setError] = useState('');

  const POSITIONS = ['Backend Developer', 'Frontend Developer', 'Full Stack', 'Mobile Developer', 'DevOps', 'Stajyer', 'Team Lead', 'Siber Güvenlik', 'Yapay Zeka', 'Product Owner', 'Data Scientist'];
  const TECHNOLOGIES = ['React', 'Java', 'Python', 'Spring Boot', 'Node.js', 'SQL', 'AWS', 'Docker', 'MSSQL', 'PostgreSQL', 'Next.js', 'Kubernetes', 'Figma', 'NLP'];

  const handleNext = (e) => {
      e.preventDefault();
      if (activeTab === 'candidate' && step === 1) {
          setStep(2);
      } else {
          handleSubmit(e);
      }
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      setError('');

      // Validation for Candidates (F-REQ-004: En az 2 teknik beceri)
      if (activeTab === 'candidate' && formData.skills.length < 2) {
          setError('Profil oluşturmak için en az 2 teknik beceri seçmelisiniz.');
          setStep(2);
          return;
      }

      // Validation for Companies (F-REQ-002: Vergi numarası doğrulaması)
      if (activeTab === 'company' && !formData.taxNumber) {
          setError('Lütfen şirket vergi numarasını giriniz.');
          return;
      }
      
      // Auto-assign title based on selected position for candidates
      const roleData = activeTab === 'candidate' ? {
          role: 'candidate',
          title: formData.positions[0] || 'Software Engineer',
          skills: formData.skills,
          preferences: {
              positions: formData.positions,
              technologies: formData.skills
          }
      } : {
          role: 'company',
          name: formData.companyName,
          taxNumber: formData.taxNumber
      };

      const finalUser = {
          email: formData.email,
          name: `${formData.name} ${formData.surname}`,
          ...roleData
      };

      try {
          register(finalUser);
          navigate(activeTab === 'candidate' ? '/jobs' : '/dashboard');
      } catch (err) {
          setError(err.message);
          setStep(1);
      }
  };

  const togglePosition = (pos) => {
    setFormData(prev => ({
        ...prev,
        positions: prev.positions.includes(pos)
           ? prev.positions.filter(p => p !== pos)
           : [...prev.positions, pos]
    }));
  };

  const toggleSkill = (skill) => {
      setFormData(prev => ({
          ...prev,
          skills: prev.skills.includes(skill) 
             ? prev.skills.filter(s => s !== skill)
             : [...prev.skills, skill]
      }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Hesap Oluşturun</h2>
            <p className="mt-2 text-sm text-slate-600">
               {step === 1 ? 'TechArchive ailesine katılarak fırsatları keşfedin.' : 'Size en uygun ilanları bulmamıza yardım edin.'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden relative">
             {/* Step Indicator (Only for Candidate) */}
             {activeTab === 'candidate' && (
                <div className="h-1 bg-slate-100 w-full mb-0">
                    <motion.div 
                        className="h-full bg-indigo-600" 
                        initial={{ width: "50%" }}
                        animate={{ width: step === 1 ? "50%" : "100%" }}
                    />
                </div>
             )}

             {/* Tabs (Only visible on Step 1) */}
             {step === 1 && (
                 <div className="flex border-b border-slate-100">
                    <button 
                      onClick={() => setActiveTab('candidate')}
                      className={`flex-1 py-4 text-sm font-medium transition-colors relative ${activeTab === 'candidate' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      Aday Hesabı
                      {activeTab === 'candidate' && (
                        <motion.div layoutId="activeTabReg" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                      )}
                    </button>
                    <button 
                      onClick={() => setActiveTab('company')}
                      className={`flex-1 py-4 text-sm font-medium transition-colors relative ${activeTab === 'company' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      Şirket Hesabı
                      {activeTab === 'company' && (
                        <motion.div layoutId="activeTabReg" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                      )}
                    </button>
                 </div>
             )}

             <div className="p-8">
                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.form 
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-4"
                            onSubmit={handleNext}
                        >
                           <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="name">Ad</Label>
                                <Input 
                                    id="name" 
                                    placeholder="Adınız" 
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    required 
                                />
                              </div>
                              <div>
                                <Label htmlFor="surname">Soyad</Label>
                                <Input 
                                    id="surname" 
                                    placeholder="Soyadınız" 
                                    value={formData.surname}
                                    onChange={e => setFormData({...formData, surname: e.target.value})}
                                    required
                                />
                              </div>
                           </div>

                           <div>
                              <Label htmlFor="email">E-posta Adresi</Label>
                              <Input 
                                id="email" 
                                type="email" 
                                placeholder="ornek@email.com" 
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                required
                              />
                           </div>
                           
                           <div>
                              <Label htmlFor="password">Şifre</Label>
                              <Input 
                                id="password" 
                                type="password" 
                                placeholder="En az 8 karakter" 
                                value={formData.password}
                                onChange={e => setFormData({...formData, password: e.target.value})}
                                required
                              />
                           </div>

                           {activeTab === 'company' && (
                             <div className="space-y-4">
                                <div>
                                    <Label htmlFor="companyName">Şirket Adı</Label>
                                    <Input 
                                        id="companyName" 
                                        placeholder="Şirketinizin Adı" 
                                        value={formData.companyName}
                                        onChange={e => setFormData({...formData, companyName: e.target.value})}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="taxNumber">Vergi Numarası (F-REQ-002)</Label>
                                    <Input 
                                        id="taxNumber" 
                                        placeholder="10 haneli vergi numarası" 
                                        value={formData.taxNumber}
                                        onChange={e => setFormData({...formData, taxNumber: e.target.value})}
                                        required
                                        maxLength={10}
                                    />
                                    <p className="text-[10px] text-slate-400 mt-1">Sistem tarafından otomatik doğrulanacaktır.</p>
                                </div>
                             </div>
                           )}

                           {error && (
                               <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-xs text-red-600 animate-in fade-in slide-in-from-top-1">
                                   {error}
                               </div>
                           )}

                           <div className="pt-2">
                               <Button className="w-full" size="lg" type="submit">
                                  {activeTab === 'candidate' ? (
                                      <span className="flex items-center">Devam Et <ChevronRight className="ml-2 h-4 w-4"/></span>
                                  ) : 'Şirket Olarak Kaydol'}
                               </Button>
                           </div>
                        </motion.form>
                    ) : (
                        <motion.form 
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <button 
                                type="button" 
                                onClick={() => setStep(1)}
                                className="text-sm text-slate-500 hover:text-indigo-600 flex items-center mb-4"
                            >
                                <ArrowLeft className="h-4 w-4 mr-1" /> Geri Dön
                            </button>

                            <div>
                                <Label className="text-lg text-slate-900 mb-2 block">Hangi pozisyonlarla ilgileniyorsunuz?</Label>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    {POSITIONS.map(pos => (
                                        <div 
                                            key={pos}
                                            onClick={() => togglePosition(pos)}
                                            className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                                                formData.positions.includes(pos) 
                                                ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                                                : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
                                            }`}
                                        >
                                            <span className="text-sm font-medium">{pos}</span>
                                            {formData.positions.includes(pos) && <CheckCircle2 className="h-4 w-4 text-indigo-600" />}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label className="text-lg text-slate-900 mb-2 block">Kullandığınız Teknolojiler</Label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {TECHNOLOGIES.map(tech => (
                                        <div 
                                            key={tech}
                                            onClick={() => toggleSkill(tech)}
                                            className={`px-3 py-2 rounded-full border cursor-pointer transition-all text-sm font-medium ${
                                                formData.skills.includes(tech)
                                                ? 'border-indigo-600 bg-indigo-600 text-white' 
                                                : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                                            }`}
                                        >
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-xs text-red-600">
                                    {error}
                                </div>
                            )}

                            <Button className="w-full mt-6" size="lg" type="submit">
                                Kaydı Tamamla
                            </Button>
                        </motion.form>
                    )}
                </AnimatePresence>

                {step === 1 && (
                    <div className="mt-6 text-center text-sm">
                       <span className="text-slate-600">
                         Zaten hesabınız var mı?{' '}
                       </span>
                       <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                         Giriş yapın
                       </Link>
                    </div>
                )}
             </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterPage;
