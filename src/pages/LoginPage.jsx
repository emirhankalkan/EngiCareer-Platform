import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('candidate'); // 'candidate' or 'company'

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
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Tekrar Hoşgeldiniz</h2>
            <p className="mt-2 text-sm text-slate-600">
              Hesabınıza giriş yaparak kariyer fırsatlarını yakalayın.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
             {/* Tabs */}
             <div className="flex border-b border-slate-100">
                <button 
                  onClick={() => setActiveTab('candidate')}
                  className={`flex-1 py-4 text-sm font-medium transition-colors relative ${activeTab === 'candidate' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Yetenek / Aday
                  {activeTab === 'candidate' && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                  )}
                </button>
                <button 
                  onClick={() => setActiveTab('company')}
                  className={`flex-1 py-4 text-sm font-medium transition-colors relative ${activeTab === 'company' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Şirket / İşveren
                  {activeTab === 'company' && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                  )}
                </button>
             </div>

             <div className="p-8">
                <form className="space-y-6">
                   <div>
                      <Label htmlFor="email">E-posta Adresi</Label>
                      <Input id="email" type="email" placeholder="ornek@email.com" />
                   </div>
                   
                   <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="password" className="mb-0">Şifre</Label>
                        <Link to="/forgot-password" class="text-xs font-medium text-indigo-600 hover:text-indigo-500">
                          Şifremi unuttum?
                        </Link>
                      </div>
                      <Input id="password" type="password" placeholder="••••••••" />
                   </div>

                   <Button className="w-full" size="lg">
                      {activeTab === 'candidate' ? 'Aday Girişi Yap' : 'Şirket Girişi Yap'}
                   </Button>
                </form>

                <div className="mt-6">
                   <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-slate-500">veya</span>
                      </div>
                   </div>

                   <div className="mt-6 text-center text-sm">
                      <span className="text-slate-600">
                        Hesabınız yok mu?{' '}
                      </span>
                      <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Hemen kayıt olun
                      </Link>
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
