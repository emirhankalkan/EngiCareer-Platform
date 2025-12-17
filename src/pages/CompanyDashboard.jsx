import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Briefcase, Users, LayoutDashboard, Settings, FileText, Plus } from 'lucide-react';

const CompanyDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
       <Navbar />
       
       <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <div className="flex items-center gap-3 mb-6 px-2">
                   <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-700 font-bold">
                     TF
                   </div>
                   <div>
                      <h3 className="font-bold text-slate-900">TechFlow Yazılım</h3>
                      <p className="text-xs text-slate-500">Şirket Hesabı</p>
                   </div>
                </div>
                
                <nav className="space-y-1">
                   <SidebarItem icon={LayoutDashboard} active label="Genel Bakış" />
                   <SidebarItem icon={Briefcase} label="İlanlarım" />
                   <SidebarItem icon={Users} label="Adaylar" badge="3 Yeni" />
                   <SidebarItem icon={FileText} label="Raporlar" />
                   <SidebarItem icon={Settings} label="Ayarlar" />
                </nav>
             </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
             <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">Panel Özeti</h1>
                <Button><Plus className="h-4 w-4 mr-2" /> Yeni İlan Oluştur</Button>
             </div>

             {/* Stats Grid */}
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <StatBox label="Aktif İlanlar" value="4" change="+1 bu hafta" />
                <StatBox label="Toplam Başvuru" value="128" change="+24 bu hafta" />
                <StatBox label="Görüntülenme" value="1,450" change="+12% artış" />
             </div>

             {/* Recent Applications */}
             <Card className="p-0 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                   <h3 className="font-bold text-slate-900">Son Başvurular</h3>
                   <Link to="#" className="text-sm text-indigo-600 font-medium hover:text-indigo-700">Tümünü Gör</Link>
                </div>
                <div className="divide-y divide-slate-100">
                    <ApplicantRow name="Ahmet Yılmaz" role="Junior React Developer" date="2 saat önce" status="İnceleniyor" />
                    <ApplicantRow name="Ayşe Demir" role="Backend Developer" date="5 saat önce" status="Yeni" />
                    <ApplicantRow name="Mehmet Kaya" role="Junior React Developer" date="1 gün önce" status="Reddedildi" />
                    <ApplicantRow name="Zeynep Çelik" role="UI/UX Designer" date="2 gün önce" status="Mülakat" />
                </div>
             </Card>
          </div>
       </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active, badge }) => (
  <button className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
     <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
        {label}
     </div>
     {badge && <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">{badge}</span>}
  </button>
);

const StatBox = ({ label, value, change }) => (
   <Card className="p-6">
      <p className="text-sm text-slate-500 font-medium mb-2">{label}</p>
      <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
      <p className="text-sm text-green-600 font-medium">{change}</p>
   </Card>
);

const ApplicantRow = ({ name, role, date, status }) => {
   const statusColors = {
      'Yeni': 'bg-blue-50 text-blue-700',
      'İnceleniyor': 'bg-yellow-50 text-yellow-700',
      'Mülakat': 'bg-purple-50 text-purple-700',
      'Reddedildi': 'bg-red-50 text-red-700',
   };

   return (
      <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
         <div className="flex items-center gap-4">
             <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">
                 {name.charAt(0)}
             </div>
             <div>
                 <div className="font-medium text-slate-900">{name}</div>
                 <div className="text-sm text-slate-500">{role}</div>
             </div>
         </div>
         <div className="flex items-center gap-4">
             <span className="text-sm text-slate-400">{date}</span>
             <Badge className={`border-0 ${statusColors[status] || 'bg-slate-100'}`}>{status}</Badge>
             <Button variant="ghost" size="sm">Detay</Button>
         </div>
      </div>
   );
}

export default CompanyDashboard;
