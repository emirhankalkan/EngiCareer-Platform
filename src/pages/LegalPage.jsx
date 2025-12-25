import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Card } from '../components/ui/Card';
import { Shield, HelpCircle, FileText, Scale } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const LegalPage = () => {
  const location = useLocation();
  const isHelp = location.pathname.includes('help');
  const isPrivacy = location.pathname.includes('privacy');

  const content = isHelp ? {
    title: "Yardım Merkezi",
    icon: HelpCircle,
    color: "text-amber-600",
    sections: [
      { t: "Nasıl İş İlanı Verebilirim?", c: "Şirket hesabı oluşturduktan sonra panelinizdeki 'Yeni İlan Oluştur' butonuna tıklayarak süreci başlatabilirsiniz." },
      { t: "Başvuru Takibi", c: "Yaptığınız başvuruların durumunu 'Başvurularım' sayfasından anlık olarak takip edebilirsiniz." },
      { t: "Şifremi Unuttum", c: "Giriş ekranındaki 'Şifremi Unuttum' linkini kullanarak yeni bir şifre talep edebilirsiniz." }
    ]
  } : {
    title: "Gizlilik Politikası",
    icon: Shield,
    color: "text-blue-600",
    sections: [
      { t: "Veri Toplama", c: "Kullanıcılarımızın ad, e-posta ve profesyonel yetenek verileri sadece iş eşleştirme amacıyla toplanmaktadır." },
      { t: "Veri Paylaşımı", c: "Verileriniz, başvurmadığınız sürece üçüncü taraf şirketlerle asla paylaşılmaz." },
      { t: "KVKK Uyumluluğu", c: "Platformumuz Türkiye Cumhuriyeti KVKK düzenlemelerine tam uyumlu olarak çalışmaktadır." }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="flex items-center gap-4 mb-12">
           <div className={`h-12 w-12 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center ${content.color}`}>
              <content.icon className="h-6 w-6" />
           </div>
           <h1 className="text-3xl font-bold text-slate-900">{content.title}</h1>
        </div>

        <div className="space-y-8">
           {content.sections.map((section, idx) => (
             <Card key={idx} className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{section.t}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {section.c}
                </p>
             </Card>
           ))}
        </div>

        <Card className="mt-12 p-8 bg-indigo-600 text-white border-0">
           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                 <h4 className="text-lg font-bold mb-1">Daha fazla sorunuz mu var?</h4>
                 <p className="opacity-80 text-sm italic">Destek ekibimiz size yardımcı olmaktan mutluluk duyar.</p>
              </div>
              <button className="px-6 py-2.5 bg-white text-indigo-600 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors">
                 Bize Ulaşın
              </button>
           </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPage;
