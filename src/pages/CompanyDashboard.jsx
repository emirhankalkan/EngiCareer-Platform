import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Briefcase, Users, LayoutDashboard, Settings, FileText, Plus, Check, X, Bell, Trash2, Edit, Save, BarChart } from 'lucide-react';
import { APPLICATIONS, JOBS } from '../data/mockData';

const CompanyDashboard = () => {
   // State for Navigation
   const [activeView, setActiveView] = useState('overview'); // overview, jobs, candidates, reports, settings

   // Local state to simulate database updates
   const [applications, setApplications] = useState(APPLICATIONS);
   const [jobs, setJobs] = useState(JOBS.filter(j => j.companyId === 2)); // Mock TechFlow jobs
   const [notification, setNotification] = useState(null);

   // Settings State (Mock)
   const [companySettings, setCompanySettings] = useState({
      name: 'TechFlow Yazılım',
      description: 'Kurumsal yazılım çözümleri üreten lider teknoloji şirketi.',
      website: 'https://techflow.com',
      location: 'İstanbul'
   });

   // Simple Toast Notification Logic
   const showNotification = (message, type = 'success') => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000);
   };

   // Handle Application Status Change
   const updateStatus = (id, newStatus) => {
      setApplications(prev => prev.map(app => 
         app.id === id ? { ...app, status: newStatus } : app
      ));
      
      const statusMsg = newStatus === 'Accepted' ? 'Başvuru onaylandı!' : 'Başvuru reddedildi.';
      showNotification(statusMsg, newStatus === 'Accepted' ? 'success' : 'error');
   };

   // Mock Save Settings
   const handleSaveSettings = (e) => {
      e.preventDefault();
      showNotification('Ayarlar başarıyla güncellendi.');
   };

   // Calculate Stats
   const activeJobsCount = jobs.length;
   const totalApplications = applications.length;
   const newApplications = applications.filter(a => a.status === 'Sent' || a.status === 'In Review').length;

   return (
    <div className="min-h-screen bg-slate-50 relative font-sans text-slate-900">
       {/* Toast Notification */}
       {notification && (
          <div className={`fixed top-24 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 animate-in slide-in-from-right fade-in duration-300 ${
             notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}>
             <Bell className="h-4 w-4" />
             {notification.message}
          </div>
       )}

       <Navbar />
       
       <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl">
          {/* Sidebar */}
          <div className="md:col-span-1">
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sticky top-24">
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
                   <SidebarItem 
                      icon={LayoutDashboard} 
                      label="Genel Bakış" 
                      active={activeView === 'overview'} 
                      onClick={() => setActiveView('overview')}
                   />
                   <SidebarItem 
                      icon={Briefcase} 
                      label="İlanlarım" 
                      active={activeView === 'jobs'} 
                      onClick={() => setActiveView('jobs')}
                   />
                   <SidebarItem 
                      icon={Users} 
                      label="Adaylar" 
                      active={activeView === 'candidates'} 
                      badge={`${newApplications} Yeni`}
                      onClick={() => setActiveView('candidates')}
                   />
                   <SidebarItem 
                      icon={FileText} 
                      label="Raporlar" 
                      active={activeView === 'reports'} 
                      onClick={() => setActiveView('reports')}
                   />
                   <SidebarItem 
                      icon={Settings} 
                      label="Ayarlar" 
                      active={activeView === 'settings'} 
                      onClick={() => setActiveView('settings')}
                   />
                </nav>
             </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3 space-y-6">
             
             {/* Header Actions */}
             <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">
                   {activeView === 'overview' && 'Panel Özeti'}
                   {activeView === 'jobs' && 'Aktif İlanlarınız'}
                   {activeView === 'candidates' && 'Tüm Başvurular'}
                   {activeView === 'reports' && 'Analiz ve Raporlar'}
                   {activeView === 'settings' && 'Şirket Ayarları'}
                </h1>
                {activeView === 'jobs' && (
                   <Button><Plus className="h-4 w-4 mr-2" /> Yeni İlan Oluştur</Button>
                )}
             </div>

             {/* RENDER CONTENT BASED ON ACTIVE VIEW */}
             
             {/* 1. OVERVIEW VIEW */}
             {activeView === 'overview' && (
               <>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <StatBox label="Aktif İlanlar" value={activeJobsCount} change="+1 bu hafta" />
                    <StatBox label="Toplam Başvuru" value={totalApplications} change="+24 bu hafta" />
                    <StatBox label="Bekleyen İşlem" value={newApplications} change="Aksiyon gerekiyor" />
                 </div>

                 <Card className="p-0 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                       <h3 className="font-bold text-slate-900">Son Başvurular</h3>
                       <button onClick={() => setActiveView('candidates')} className="text-sm text-indigo-600 font-medium hover:text-indigo-700">Tümünü Gör</button>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {applications.slice(0, 5).map(app => (
                            <ApplicationRow key={app.id} app={app} updateStatus={updateStatus} />
                        ))}
                    </div>
                 </Card>
               </>
             )}

             {/* 2. JOBS VIEW */}
             {activeView === 'jobs' && (
                <div className="space-y-4">
                   {jobs.map(job => (
                      <Card key={job.id} className="p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                         <div>
                            <h3 className="font-bold text-lg text-slate-900">{job.title}</h3>
                            <div className="text-slate-500 text-sm flex gap-4 mt-2">
                               <span>{job.type}</span>
                               <span>•</span>
                               <span>{job.location}</span>
                               <span>•</span>
                               <span>{job.salary}</span>
                            </div>
                         </div>
                         <div className="flex gap-2">
                            <Button variant="outline" size="sm"><Edit className="h-4 w-4 mr-2" /> Düzenle</Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button>
                         </div>
                      </Card>
                   ))}
                </div>
             )}

             {/* 3. CANDIDATES VIEW */}
             {activeView === 'candidates' && (
                <Card className="p-0 overflow-hidden">
                   <div className="p-4 bg-slate-50 border-b border-slate-100 text-sm text-slate-500">
                      Toplam {applications.length} başvuru görüntüleniyor
                   </div>
                   <div className="divide-y divide-slate-100">
                       {applications.map(app => (
                           <ApplicationRow key={app.id} app={app} updateStatus={updateStatus} />
                       ))}
                   </div>
                </Card>
             )}

             {/* 4. REPORTS VIEW (New) */}
             {activeView === 'reports' && (
                <div className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-6">
                         <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <BarChart className="h-5 w-5 text-indigo-600" /> Başvuru Dağılımı
                         </h3>
                         <div className="space-y-4">
                            <ReportItem label="Junior React Developer" value="45%" color="bg-indigo-600" />
                            <ReportItem label="Java Backend Stajyeri" value="30%" color="bg-blue-500" />
                            <ReportItem label="Full Stack Team Lead" value="25%" color="bg-purple-500" />
                         </div>
                      </Card>
                      <Card className="p-6">
                         <h3 className="font-bold text-slate-900 mb-4">Aday Deneyimi</h3>
                         <div className="space-y-4">
                            <ReportItem label="Junior (0-2 Yıl)" value="60%" color="bg-slate-800" />
                            <ReportItem label="Mid (2-5 Yıl)" value="25%" color="bg-slate-600" />
                            <ReportItem label="Senior (5+ Yıl)" value="15%" color="bg-slate-400" />
                         </div>
                      </Card>
                   </div>
                   <Card className="p-6">
                      <h3 className="font-bold text-slate-900 mb-2">Haftalık Aktivite</h3>
                      <div className="h-48 flex items-end justify-between gap-2 mt-4">
                         {[40, 65, 30, 85, 50, 90, 45].map((h, i) => (
                            <div key={i} className="w-full bg-indigo-100 rounded-t-lg relative group">
                               <div 
                                 className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-t-lg transition-all group-hover:bg-indigo-600"
                                 style={{ height: `${h}%` }}
                               />
                            </div>
                         ))}
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-slate-400 uppercase">
                         <span>Pzt</span><span>Sal</span><span>Çar</span><span>Per</span><span>Cum</span><span>Cmt</span><span>Paz</span>
                      </div>
                   </Card>
                </div>
             )}

             {/* 5. SETTINGS VIEW (New) */}
             {activeView === 'settings' && (
                <Card className="p-8">
                   <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl">
                      <div>
                         <Label htmlFor="companyName">Şirket Adı</Label>
                         <Input 
                           id="companyName" 
                           value={companySettings.name} 
                           onChange={(e) => setCompanySettings({...companySettings, name: e.target.value})}
                         />
                      </div>
                      <div>
                         <Label htmlFor="description">Hakkında</Label>
                         <textarea 
                            id="description"
                            className="w-full min-h-[100px] px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                            value={companySettings.description}
                            onChange={(e) => setCompanySettings({...companySettings, description: e.target.value})}
                         />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <Label htmlFor="website">Web Sitesi</Label>
                            <Input 
                              id="website" 
                              value={companySettings.website} 
                              onChange={(e) => setCompanySettings({...companySettings, website: e.target.value})}
                            />
                         </div>
                         <div>
                            <Label htmlFor="location">Konum</Label>
                            <Input 
                              id="location" 
                              value={companySettings.location} 
                              onChange={(e) => setCompanySettings({...companySettings, location: e.target.value})}
                            />
                         </div>
                      </div>
                      <div className="pt-4 flex justify-end">
                         <Button type="submit"><Save className="h-4 w-4 mr-2" /> Değişiklikleri Kaydet</Button>
                      </div>
                   </form>
                </Card>
             )}

          </div>
       </div>
    </div>
  );
};

// --- Helper Components ---

const SidebarItem = ({ icon: Icon, label, active, badge, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
  >
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

const ReportItem = ({ label, value, color }) => (
   <div>
      <div className="flex justify-between text-sm mb-1">
         <span className="text-slate-600 font-medium">{label}</span>
         <span className="text-slate-900 font-bold">{value}</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
         <div className={`h-full ${color}`} style={{ width: value }} />
      </div>
   </div>
);

// Extracted Application Row to reusable component
const ApplicationRow = ({ app, updateStatus }) => (
   <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50 transition-colors gap-4">
      <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">
              {app.candidateName.charAt(0)}
          </div>
          <div>
              <div className="font-medium text-slate-900">{app.candidateName}</div>
              <div className="text-sm text-slate-500">{app.candidateRole} • {app.appliedAt}</div>
          </div>
      </div>
      <div className="flex items-center gap-4 justify-between sm:justify-end w-full sm:w-auto">
          <StatusBadge status={app.status} />
          
          {(app.status === 'Sent' || app.status === 'In Review') ? (
             <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                  title="Onayla"
                  onClick={() => updateStatus(app.id, 'Accepted')}
                >
                   <Check className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  title="Reddet"
                  onClick={() => updateStatus(app.id, 'Rejected')}
                >
                   <X className="h-4 w-4" />
                </Button>
             </div>
          ) : (
             <Button variant="ghost" size="sm">Detay</Button>
          )}
      </div>
   </div>
);

const StatusBadge = ({ status }) => {
   const styles = {
      'Sent': 'bg-blue-50 text-blue-700',
      'In Review': 'bg-yellow-50 text-yellow-700',
      'Accepted': 'bg-green-50 text-green-700',
      'Rejected': 'bg-red-50 text-red-700',
   };
   
   return (
      <Badge className={`border-0 ${styles[status] || 'bg-slate-100'}`}>
         {status === 'Sent' ? 'Yeni' : 
          status === 'In Review' ? 'İnceleniyor' : 
          status === 'Accepted' ? 'Kabul Edildi' : 'Reddedildi'}
      </Badge>
   );
};

export default CompanyDashboard;
