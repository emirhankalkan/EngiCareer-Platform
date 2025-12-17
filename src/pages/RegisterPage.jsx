import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const [activeTab, setActiveTab] = useState('candidate');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Hesap Oluşturun</h2>
            <p className="mt-2 text-sm text-slate-600">
              TechArchive ailesine katılarak fırsatları keşfedin.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
             {/* Tabs */}
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

             <div className="p-8">
                <form className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Ad</Label>
                        <Input id="name" placeholder="Adınız" />
                      </div>
                      <div>
                        <Label htmlFor="surname">Soyad</Label>
                        <Input id="surname" placeholder="Soyadınız" />
                      </div>
                   </div>

                   <div>
                      <Label htmlFor="email">E-posta Adresi</Label>
                      <Input id="email" type="email" placeholder="ornek@email.com" />
                   </div>
                   
                   <div>
                      <Label htmlFor="password">Şifre</Label>
                      <Input id="password" type="password" placeholder="En az 8 karakter" />
                   </div>

                   {activeTab === 'company' && (
                     <div>
                        <Label htmlFor="companyName">Şirket Adı</Label>
                        <Input id="companyName" placeholder="Şirketinizin Adı" />
                        <p className="text-xs text-slate-500 mt-1">Vergi no doğrulaması daha sonra yapılacaktır.</p>
                     </div>
                   )}

                   <div className="pt-2">
                       <Button className="w-full" size="lg">
                          {activeTab === 'candidate' ? 'Aday Olarak Kaydol' : 'Şirket Olarak Kaydol'}
                       </Button>
                   </div>
                </form>

                <div className="mt-6 text-center text-sm">
                   <span className="text-slate-600">
                     Zaten hesabınız var mı?{' '}
                   </span>
                   <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                     Giriş yapın
                   </Link>
                </div>
             </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterPage;
