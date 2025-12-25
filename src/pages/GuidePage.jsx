import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BookOpen, FileText, Video, GraduationCap, ArrowRight } from 'lucide-react';

const GuidePage = () => {
  const guides = [
    {
      icon: FileText,
      title: "CV ve Ön Yazı Hazırlama",
      desc: "ATS sistemlerine uyumlu, dikkat çekici özgeçmiş oluşturma teknikleri.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: GraduationCap,
      title: "Teknik Mülakat Hazırlığı",
      desc: "Algoritma, veri yapıları ve sistem tasarımı sorularına nasıl çalışılır?",
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      icon: Video,
      title: "Video Mülakat İpuçları",
      desc: "Uzaktan mülakatlarda kamera karşısında profesyonel duruş ve iletişim.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: BookOpen,
      title: "Sektörel Terimler Sözlüğü",
      desc: "Yazılım ve mühendislik dünyasında en çok kullanılan terimler ve anlamları.",
      color: "bg-green-100 text-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Kariyer Rehberi</h1>
          <p className="text-lg text-slate-600">
            Adım adım kariyer planlama, gelişim kaynakları ve sektörün içinden uzman tavsiyeleri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {guides.map((guide, i) => (
             <Card key={i} className="p-8 hover:border-indigo-100 hover:shadow-md transition-all group">
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${guide.color}`}>
                   <guide.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{guide.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {guide.desc}
                </p>
                <Button variant="outline" className="group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  Rehberi Görüntüle <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
             </Card>
           ))}
        </div>

        <section className="mt-24 p-12 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Daha Fazlasını Mı Arıyorsunuz?</h2>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              Sizin için hazırladığımız yüzlerce doküman ve video içeriğe toplu erişim sağlayın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button className="px-8">Kütüphaneye Git</Button>
               <Button variant="outline" className="px-8">Mentörlük Al</Button>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GuidePage;
