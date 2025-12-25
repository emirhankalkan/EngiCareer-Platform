import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Users, Building2, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

/**
 * LANDING PAGE COMPONENT
 * 
 * DESIGN RATIONALE:
 * This page serves as the entry point for the "Job and Internship Platform".
 * It implements a "Hero Section" to immediately capture user attention with value propositions.
 * 
 * FEATURES:
 * - Smart Search: Allows filtering by position and location.
 * - Statistics: Displays platform growth to build trust (Social Proof).
 * - Value Proposition: Highlights key differentiators like "Smart Matching".
 */
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-32 lg:pt-32 lg:pb-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 mb-8 border border-indigo-100">
                🚀 Kariyerinde yeni bir sayfa aç
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">
                Hayalindeki <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Teknoloji İşini</span> <br/> Bugün Bul.
              </h1>
              <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Türkiye'nin en büyük IT ve mühendislik odaklı kariyer platformu.
                Binlerce şirket ve yetenekli aday burada buluşuyor.
              </p>

              {/* Search Box */}
              <div className="bg-white p-2 rounded-2xl shadow-xl shadow-indigo-100/50 max-w-3xl mx-auto border border-slate-100 flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Pozisyon veya yetenek (örn: React, Java)" 
                    className="w-full h-12 pl-12 pr-4 rounded-xl border-none bg-transparent focus:ring-0 text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <div className="flex-1 border-t md:border-t-0 md:border-l border-slate-100 relative">
                  <Building2 className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                   <input 
                    type="text" 
                    placeholder="Şehir veya Şirket" 
                    className="w-full h-12 pl-12 pr-4 rounded-xl border-none bg-transparent focus:ring-0 text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <Link to="/jobs">
                  <Button size="lg" className="md:w-auto w-full">İş Ara</Button>
                </Link>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500">
                <span>Popüler:</span>
                <span className="cursor-pointer hover:text-indigo-600">Frontend</span>
                <span className="cursor-pointer hover:text-indigo-600">Backend</span>
                <span className="cursor-pointer hover:text-indigo-600">DevOps</span>
                <span className="cursor-pointer hover:text-indigo-600">Staj</span>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 inset-x-0 h-full overflow-hidden -z-10 pointer-events-none">
           <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-100/50 rounded-[100%] blur-3xl opacity-50" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard icon={TrendingUp} value="15,000+" label="Aktif İş İlanı" />
              <StatCard icon={Building2} value="3,500+" label="Şirket" />
              <StatCard icon={Users} value="50,000+" label="Aday" />
           </div>
        </div>
      </section>

      {/* Features/Value Prop */}
      <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 max-w-7xl">
             <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Neden EngiCareer?</h2>
                <p className="text-lg text-slate-600">Sadece mühendisler ve geliştiriciler için tasarlanmış özel deneyim.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard 
                  title="Akıllı Eşleşme" 
                  desc="Yeteneklerinize ve deneyiminize en uygun ilanları size özel algoritmayla sunuyoruz."
                  delay={0.1}
                />
                 <FeatureCard 
                  title="Detaylı Filtreleme" 
                  desc="Sadece 'Java' değil, 'Spring Boot 3.x' bilenleri arayan ilanları bulun."
                  delay={0.2}
                />
                 <FeatureCard 
                  title="Şeffaf Süreç" 
                  desc="Başvurunuzun her aşamasını takip edin, geri dönüş alamama derdine son verin."
                  delay={0.3}
                />
             </div>
          </div>
      </section>

      <Footer />
    </div>
  );
};

const StatCard = ({ icon: Icon, value, label }) => (
  <div className="flex items-center justify-center gap-4">
     <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
        <Icon className="h-6 w-6" />
     </div>
     <div>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <div className="text-sm text-slate-500">{label}</div>
     </div>
  </div>
);

const FeatureCard = ({ title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
  >
    <div className="h-12 w-12 bg-indigo-600 rounded-xl mb-6 flex items-center justify-center">
       <div className="h-6 w-6 bg-white rounded-full opacity-20" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </motion.div>
);

export default LandingPage;
