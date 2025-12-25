import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Briefcase, GraduationCap, Code2, ExternalLink, Download, Plus } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const [notification, setNotification] = React.useState(null);

  const showNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Mock profile data if not fully present in user object
  const profileData = {
    name: user?.name || 'Aday Adı',
    title: user?.title || 'Yazılım Geliştirici',
    email: user?.email || 'aday@example.com',
    location: user?.location || 'Eskişehir, Türkiye',
    skills: user?.skills || ['React', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Git'],
    experience: [
      {
        company: 'Tech Solutions Inc.',
        role: 'Frontend Intern',
        period: 'Haziran 2024 - Eylül 2024',
        desc: 'React ve Next.js kullanarak kurumsal web uygulamalarının geliştirilmesinde rol aldım.'
      }
    ],
    education: [
      {
        school: 'Eskişehir Osmangazi Üniversitesi',
        degree: 'Bilgisayar Mühendisliği',
        period: '2021 - 2025',
        desc: 'Genel Not Ortalaması: 3.45 / 4.00'
      }
    ],
    projects: [
      {
        name: 'EngiCareer Platform',
        tech: 'React, Tailwind, Mock DB',
        desc: 'Mühendislik ve IT sektörü için özel iş ve staj başvuru platformu.'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Notification Banner */}
      {notification && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg font-medium"
        >
          {notification}
        </motion.div>
      )}

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 text-center">
              <div className="h-32 w-32 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-indigo-600 border-4 border-white shadow-sm">
                {profileData.name.charAt(0)}
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{profileData.name}</h2>
              <p className="text-slate-600 mb-6 font-medium">{profileData.title}</p>
              
              <div className="space-y-3 text-left border-t border-slate-100 pt-6">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{profileData.location}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Briefcase className="h-4 w-4" />
                  <span className="text-sm">Çalışmaya Hazır / Staj Arıyor</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                 <Button className="w-full flex items-center justify-center gap-2" onClick={() => showNotify("CV'niz hazırlandı ve indirme başlatıldı!")}>
                    <Download className="h-4 w-4" /> CV İndir
                 </Button>
                 <Button variant="outline" className="w-full" onClick={() => showNotify('Profil düzenleme ekranı yakında eklenecektir.')}>Profili Düzenle</Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Code2 className="h-5 w-5 text-indigo-600" /> Teknik Yetenekler
              </h3>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
                 <button 
                  onClick={() => showNotify('Yeni yetenek eklendi!')}
                  className="inline-flex items-center gap-1 text-xs text-indigo-600 font-medium hover:underline"
                 >
                    <Plus className="h-3 w-3" /> Ekle
                 </button>
              </div>
            </Card>
          </div>

          {/* Right Column: Experience, Education, Projects */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Experience Section */}
            <Card className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-indigo-600" /> İş Deneyimi
                </h3>
                <Button variant="ghost" size="sm" className="text-indigo-600" onClick={() => showNotify('Deneyim ekleme formu açılıyor...')}>
                    <Plus className="h-4 w-4" /> Ekle
                </Button>
              </div>
              
              <div className="space-y-8">
                {profileData.experience.map((exp, index) => (
                  <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-slate-200">
                    <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-indigo-600" />
                    <h4 className="font-bold text-slate-900">{exp.role}</h4>
                    <div className="text-sm text-indigo-600 font-medium mb-2">{exp.company}</div>
                    <div className="text-sm text-slate-500 mb-3">{exp.period}</div>
                    <p className="text-slate-600 text-sm leading-relaxed">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Education Section */}
            <Card className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-indigo-600" /> Eğitim
                </h3>
                <Button variant="ghost" size="sm" className="text-indigo-600" onClick={() => showNotify('Eğitim bilgisi ekleme formu açılıyor...')}>
                    <Plus className="h-4 w-4" /> Ekle
                </Button>
              </div>
              
              <div className="space-y-8">
                {profileData.education.map((edu, index) => (
                  <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-slate-200">
                    <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-indigo-600" />
                    <h4 className="font-bold text-slate-900">{edu.degree}</h4>
                    <div className="text-sm text-indigo-600 font-medium mb-2">{edu.school}</div>
                    <div className="text-sm text-slate-500 mb-3">{edu.period}</div>
                    <p className="text-slate-600 text-sm leading-relaxed">{edu.desc}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Projects Section */}
            <Card className="p-8">
               <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Code2 className="h-6 w-6 text-indigo-600" /> Projeler
                </h3>
                <Button variant="ghost" size="sm" className="text-indigo-600" onClick={() => showNotify('Proje ekleme formu açılıyor...')}>
                    <Plus className="h-4 w-4" /> Ekle
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileData.projects.map((project, index) => (
                  <div key={index} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-indigo-100 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{project.name}</h4>
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                    </div>
                    <div className="text-xs text-indigo-600 font-medium mb-2">{project.tech}</div>
                    <p className="text-sm text-slate-600 leading-relaxed">{project.desc}</p>
                  </div>
                ))}
              </div>
            </Card>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
