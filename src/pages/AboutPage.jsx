import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { Code2, PenTool, Database, Users } from 'lucide-react';

/**
 * ABOUT PAGE
 * 
 * Provides information about the project's purpose and the team.
 * Explicitly mentions "Eskişehir Osmangazi University" and "Design Processes Course".
 */
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      <main>
        {/* Project Header */}
        <section className="bg-white border-b border-slate-100 py-20">
           <div className="container mx-auto px-4 text-center max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                 <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase mb-4 block">
                   Tasarım Süreçleri Projesi
                 </span>
                 <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                    EngiCareer Platform
                 </h1>
                 <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Eskişehir Osmangazi Üniversitesi Bilgisayar Mühendisliği Bölümü için geliştirilmiş, 
                    IT ve mühendislik sektörüne özel yeni nesil kariyer platformu.
                 </p>
              </motion.div>
           </div>
        </section>

        {/* Mission / Vision */}
        <section className="py-16 container mx-auto px-4 max-w-7xl">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                 <h2 className="text-3xl font-bold text-slate-900">Projenin Amacı</h2>
                 <p className="text-slate-600 leading-relaxed">
                    Günümüzde genel amaçlı kariyer siteleri, teknik yeteneklerin ve mühendislik gereksinimlerinin 
                    karmaşıklığını yönetmekte yetersiz kalmaktadır.
                 </p>
                 <p className="text-slate-600 leading-relaxed">
                    EngiCareer, <strong>"Yeteneğe Özel Eşleşme"</strong> algoritması ve detaylı teknik filtreleme 
                    altyapısı ile adayları ve şirketleri en doğru noktada buluşturmayı hedefler. Backend simülasyonu 
                    ve modern frontend mimarisi ile gerçekçi bir yazılım deneyimi sunar.
                 </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <StatBox icon={Code2} label="Modern Stack" value="React 18" />
                 <StatBox icon={Database} label="Veri Yapısı" value="Mock SQL" />
                 <StatBox icon={PenTool} label="UI/UX" value="Tailwind" />
                 <StatBox icon={Users} label="Kullanıcı" value="Role-Based" />
              </div>
           </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white border-y border-slate-100">
           <div className="container mx-auto px-4 text-center max-w-7xl">
              <h2 className="text-3xl font-bold text-slate-900 mb-12">Geliştirici Ekip</h2>
              <div className="flex flex-wrap justify-center gap-8">
                 <TeamMember name="Dilara Alkınoğlu" role="Frontend Developer & UI/UX" />
                 <TeamMember name="Emirhan Kalkan" role="Backend Developer" />
                 <TeamMember name="Furkan Gemici" role="Database Administrator" />
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const StatBox = ({ icon: Icon, label, value }) => (
   <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
      <div className="h-12 w-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-3">
         <Icon className="h-6 w-6" />
      </div>
      <div className="font-bold text-slate-900 text-lg">{value}</div>
      <div className="text-xs text-slate-500 uppercase tracking-wide">{label}</div>
   </div>
);

const TeamMember = ({ name, role }) => (
   <div className="bg-slate-50 p-6 rounded-xl w-64 border border-slate-100 hover:border-indigo-100 transition-colors">
      <div className="h-20 w-20 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-slate-500">
         {name.charAt(0)}
      </div>
      <h3 className="font-bold text-slate-900 text-lg">{name}</h3>
      <p className="text-indigo-600 text-sm font-medium">{role}</p>
   </div>
);

export default AboutPage;
