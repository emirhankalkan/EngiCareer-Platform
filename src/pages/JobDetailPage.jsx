import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { MapPin, Clock, Building2, Banknote, Share2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const JobDetailPage = () => {
  const { id } = useParams();

  // Mock data - in real app would fetch by ID
  const job = {
    title: 'Junior React Developer',
    company: 'TechFlow Yazılım',
    location: 'İstanbul (Hibrit)',
    type: 'Tam Zamanlı',
    salary: '₺25.000 - ₺35.000',
    postedAt: '2 gün önce',
    skills: ['React', 'TypeScript', 'Tailwind', 'Redux', 'Git'],
    description: `
      <p>TechFlow Yazılım olarak büyüyen ekibimize katılacak yetenekli bir Junior React Geliştirici arıyoruz.</p>
      <p><br/></p>
      <p>Modern teknoloji stack'imiz ile geliştirdiğimiz SaaS projelerinde görev alacak, deneyimli bir ekiple çalışma fırsatı bulacaksınız.</p>
    `,
    requirements: [
      'Üniversitelerin ilgili mühendislik bölümlerinden mezun',
      'React.js ve Javascript (ES6+) konusunda temel bilgi sahibi',
      'HTML5, CSS3 ve Modern UI kütüphanelerine hakim (Tailwind tercih sebebidir)',
      'REST API kullanımı konusunda deneyimli',
      'Git versiyon kontrol sistemini kullanabilen',
      'Öğrenmeye açık, takım çalışmasına yatkın'
    ],
    responsibilities: [
      'Frontend arayüz bileşenlerinin geliştirilmesi',
      'Backend ekibi ile koordineli çalışarak API entegrasyonlarının yapılması',
      'Kod kalitesine özen gösterilmesi ve best-practice\'lerin uygulanması',
      'UI/UX tasarımlarının teknik olarak hayata geçirilmesi'
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
           <Link to="/jobs" className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600">
             <ArrowLeft className="h-4 w-4 mr-1" />
             İlanlara Dön
           </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Main Content */}
           <div className="lg:col-span-2 space-y-6">
              <Card className="p-8">
                 <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex gap-4">
                       <div className="h-16 w-16 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                          <Building2 className="h-8 w-8 text-slate-500" />
                       </div>
                       <div>
                          <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
                          <p className="text-lg text-slate-600 font-medium">{job.company}</p>
                       </div>
                    </div>
                    <div className="hidden sm:flex gap-2">
                       <Button variant="outline" size="sm"><Share2 className="h-4 w-4 mr-2" /> Paylaş</Button>
                    </div>
                 </div>

                 <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-8 border-b border-slate-100 pb-8">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                      <MapPin className="h-4 w-4 text-indigo-500" /> {job.location}
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                      <Clock className="h-4 w-4 text-indigo-500" /> {job.type}
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                      <Banknote className="h-4 w-4 text-green-600" /> {job.salary}
                    </div>
                 </div>

                 <div className="prose prose-slate max-w-none">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">İş Tanımı</h3>
                    <div dangerouslySetInnerHTML={{ __html: job.description }} className="text-slate-600 mb-6" />

                    <h3 className="text-lg font-bold text-slate-900 mb-4">Aranan Nitelikler</h3>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
                       {job.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                       ))}
                    </ul>

                    <h3 className="text-lg font-bold text-slate-900 mb-4">Sorumluluklar</h3>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                       {job.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                       ))}
                    </ul>
                 </div>
              </Card>
           </div>

           {/* Sidebar */}
           <div className="space-y-6">
              <Card className="p-6 sticky top-24">
                 <h3 className="font-bold text-slate-900 mb-4">Başvuru Yap</h3>
                 <p className="text-sm text-slate-500 mb-6">
                   Bu ilana başvurmak için profilinizin güncel olduğundan emin olun.
                 </p>
                 
                 <Button className="w-full mb-4" size="lg">Hemen Başvur</Button>
                 <Button variant="secondary" className="w-full">Kaydet</Button>
                 
                 <div className="mt-8 pt-6 border-t border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-3">Gerekli Yetenekler</h4>
                    <div className="flex flex-wrap gap-2">
                       {job.skills.map(skill => (
                          <Badge key={skill} variant="secondary">{skill}</Badge>
                       ))}
                    </div>
                 </div>
              </Card>
           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobDetailPage;
