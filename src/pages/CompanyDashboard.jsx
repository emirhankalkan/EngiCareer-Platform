import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Briefcase, Users, LayoutDashboard, Settings, FileText, Plus, Check, X, Bell, Trash2, Edit, Save, BarChart, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { APPLICATIONS, JOBS, USERS } from '../data/mockData';

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

   // F-REQ-024: İstatistikler haftalık ve aylık seçenekli olmalıdır
   const [statsPeriod, setStatsPeriod] = useState('weekly');
   const [showJobModal, setShowJobModal] = useState(false);
   const [newJobData, setNewJobData] = useState({
       title: '',
       type: 'Tam Zamanlı',
       location: '',
       salary: '',
       skills: []
   });

   // Simple Toast Notification Logic
   const showNotification = (message, type = 'success') => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000);
   };

   // Handle Application Status Change (F-REQ-021)
   const updateStatus = (id, newStatus) => {
      setApplications(prev => prev.map(app => 
         app.id === id ? { ...app, status: newStatus } : app
      ));
      
      const statusMessages = {
         'Accepted': 'Aday mülakata çağrıldı!',
         'Rejected': 'Başvuru olumsuz sonuçlandı.',
         'OnHold': 'Başvuru 2. tura ertelendi.'
      };
      
      showNotification(statusMessages[newStatus] || 'Durum güncellendi');
   };

   // Handle Job Creation (F-REQ-010, F-REQ-011)
   const handleCreateJob = (e) => {
       e.preventDefault();
       if (newJobData.skills.length === 0) {
           showNotification('En az bir teknoloji belirtmelisiniz!', 'error');
           return;
       }

       const job = {
           id: Date.now(),
           companyId: 2,
           company: 'TechFlow Yazılım',
           ...newJobData,
           status: 'Admin Approval', // F-REQ-011
           postedAt: new Date().toISOString()
       };

       setJobs(prev => [job, ...prev]);
       setShowJobModal(false);
       setNewJobData({ title: '', type: 'Tam Zamanlı', location: '', salary: '', skills: [] });
       showNotification('İlan oluşturuldu ve onaya gönderildi.');
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
                       label="Aday Havuzu" 
                       active={activeView === 'pool'} 
                       onClick={() => setActiveView('pool')}
                    />
                    <SidebarItem 
                       icon={Users} 
                       label="Başvurular" 
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
                   {activeView === 'candidates' && 'Gelen Başvurular'}
                   {activeView === 'pool' && 'Aday Havuzu'}
                   {activeView === 'reports' && 'Analiz ve Raporlar'}
                   {activeView === 'settings' && 'Şirket Ayarları'}
                </h1>
                {activeView === 'jobs' && (
                   <Button onClick={() => setShowJobModal(true)}><Plus className="h-4 w-4 mr-2" /> Yeni İlan Oluştur</Button>
                )}
             </div>

             {/* RENDER CONTENT BASED ON ACTIVE VIEW */}
             
             {/* 1. OVERVIEW VIEW */}
             {activeView === 'overview' && (
               <>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <StatBox 
                       label="Aktif İlanlar" 
                       value={activeJobsCount} 
                       change={statsPeriod === 'weekly' ? "+1 bu hafta" : "+4 bu ay"} 
                    />
                    <StatBox 
                       label="Toplam Başvuru" 
                       value={totalApplications} 
                       change={statsPeriod === 'weekly' ? "+24 bu hafta" : "+112 bu ay"} 
                    />
                    <StatBox 
                       label="Bekleyen İşlem" 
                       value={newApplications} 
                       change="Aksiyon gerekiyor" 
                    />
                 </div>
                 
                 {/* Period Toggle (F-REQ-024) */}
                 <div className="flex justify-end">
                    <div className="bg-slate-200 p-1 rounded-lg flex text-xs font-bold">
                       <button 
                          onClick={() => setStatsPeriod('weekly')}
                          className={`px-3 py-1.5 rounded-md transition-all ${statsPeriod === 'weekly' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                       >Haftalık</button>
                       <button 
                          onClick={() => setStatsPeriod('monthly')}
                          className={`px-3 py-1.5 rounded-md transition-all ${statsPeriod === 'monthly' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                       >Aylık</button>
                    </div>
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

             {/* 3.1 CANDIDATE POOL VIEW (New Requirement) */}
             {activeView === 'pool' && (
                <div className="space-y-6">
                   <Card className="p-4">
                      <div className="flex gap-4">
                         <Input placeholder="Yetenek veya pozisyon ile aday ara..." className="max-w-md" />
                         <Button variant="outline">Filtrele</Button>
                      </div>
                   </Card>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Filtering for candidates in mock data */}
                      {USERS.filter(u => u.role === 'candidate').map(candidate => (
                         <Card key={candidate.id} className="p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                               <div className="flex items-center gap-4">
                                  <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-lg font-bold text-indigo-700">
                                     {candidate.name.charAt(0)}
                                  </div>
                                  <div>
                                     <h4 className="font-bold text-slate-900">{candidate.name}</h4>
                                     <p className="text-sm text-slate-500">{candidate.title}</p>
                                  </div>
                               </div>
                               <Badge variant="secondary">{candidate.experience}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                               {candidate.skills.map((s, i) => (
                                  <Badge key={i} variant="outline" className="text-[10px]">{s}</Badge>
                               ))}
                            </div>
                             <div className="flex gap-2">
                                <Link to="/profile" className="flex-1">
                                   <Button size="sm" className="w-full">Profili Gör</Button>
                                </Link>
                                <Link to="/messages" className="flex-1">
                                   <Button size="sm" variant="outline" className="w-full">Mesaj Gönder</Button>
                                </Link>
                             </div>
                         </Card>
                      ))}
                   </div>
                </div>
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
                               <Badge variant="secondary" className={job.status === 'Admin Approval' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}>
                                  {job.status === 'Admin Approval' ? 'Onay Bekliyor' : 'Aktif'}
                               </Badge>
                            </div>
                         </div>
                          <div className="flex gap-2">
                             <Button variant="outline" size="sm" onClick={() => showNotification('Düzenleme ekranı yakında eklenecektir.')}><Edit className="h-4 w-4 mr-2" /> Düzenle</Button>
                             <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => {
                                   setJobs(prev => prev.filter(j => j.id !== job.id));
                                   showNotification('İlan yayından kaldırıldı.', 'error');
                                }}
                             >
                                <Trash2 className="h-4 w-4" />
                             </Button>
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

             {/* Job Creation Modal (F-REQ-010) */}
             {showJobModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
                    >
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900">Yeni İlan Yayınla</h3>
                            <button onClick={() => setShowJobModal(false)} className="text-slate-400 hover:text-slate-600"><X className="h-6 w-6" /></button>
                        </div>
                        <form onSubmit={handleCreateJob} className="p-6 space-y-4">
                            <div>
                                <Label htmlFor="jobTitle">İlan Başlığı</Label>
                                <Input 
                                    id="jobTitle" 
                                    placeholder="Örn: Senior Java Developer" 
                                    value={newJobData.title}
                                    onChange={e => setNewJobData({...newJobData, title: e.target.value})}
                                    required 
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="jobType">Çalışma Şekli</Label>
                                    <select 
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                                        value={newJobData.type}
                                        onChange={e => setNewJobData({...newJobData, type: e.target.value})}
                                    >
                                        <option>Tam Zamanlı</option>
                                        <option>Yarı Zamanlı</option>
                                        <option>Staj</option>
                                        <option>Remote</option>
                                    </select>
                                </div>
                                <div>
                                    <Label htmlFor="jobLoc">Konum</Label>
                                    <Input 
                                        id="jobLoc" 
                                        placeholder="İstanbul" 
                                        value={newJobData.location}
                                        onChange={e => setNewJobData({...newJobData, location: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                               <Label>Gerekli Teknolojiler (F-REQ-010)</Label>
                               <div className="flex flex-wrap gap-2 mt-2">
                                  {['React', 'Java', 'Python', 'Go', 'SQL', 'AWS', 'Docker'].map(tech => (
                                     <button
                                        key={tech}
                                        type="button"
                                        onClick={() => {
                                           setNewJobData(prev => ({
                                              ...prev,
                                              skills: prev.skills.includes(tech) 
                                                 ? prev.skills.filter(t => t !== tech) 
                                                 : [...prev.skills, tech]
                                           }));
                                        }}
                                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                                           newJobData.skills.includes(tech) 
                                           ? 'bg-indigo-600 text-white' 
                                           : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                     >
                                        {tech}
                                     </button>
                                  ))}
                               </div>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowJobModal(false)}>İptal</Button>
                                <Button type="submit" className="flex-1">Onaya Gönder</Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
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
                  title="Mülakata Çağır"
                  onClick={() => updateStatus(app.id, 'Accepted')}
                >
                   <Check className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 w-8 p-0 text-amber-600 hover:text-amber-700 hover:bg-amber-50 border-amber-200"
                  title="2. Tur"
                  onClick={() => updateStatus(app.id, 'OnHold')}
                >
                   <Clock className="h-4 w-4" />
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
      'OnHold': 'bg-purple-50 text-purple-700',
   };
   
   return (
      <Badge className={`border-0 ${styles[status] || 'bg-slate-100'}`}>
         {status === 'Sent' ? 'Yeni' : 
          status === 'In Review' ? 'İnceleniyor' : 
          status === 'Accepted' ? 'Mülakat' : 
          status === 'OnHold' ? '2. Tur / Beklemede' : 'Reddedildi'}
      </Badge>
   );
};

export default CompanyDashboard;
