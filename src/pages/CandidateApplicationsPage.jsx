import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { APPLICATIONS, JOBS } from '../data/mockData';
import { Badge } from '../components/ui/Badge';
import { Building2, Calendar, MapPin } from 'lucide-react';

const CandidateApplicationsPage = () => {
  // For demo, we just show all applications or filter by a mock candidate ID
  const myApplications = APPLICATIONS; 

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Accepted': return <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Kabul Edildi</Badge>;
      case 'Rejected': return <Badge className="bg-red-100 text-red-700 hover:bg-red-200">Reddedildi</Badge>;
      case 'In Review': return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">Değerlendiriliyor</Badge>;
      default: return <Badge variant="outline">İletildi</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="mb-8">
           <h1 className="text-2xl font-bold text-slate-900">Geçmiş Başvurularım</h1>
           <p className="text-slate-500">Yaptığınız tüm iş başvurularının durumunu buradan takip edebilirsiniz.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {myApplications.length > 0 ? (
                <div className="divide-y divide-slate-100">
                    {myApplications.map((app) => {
                        const job = JOBS.find(j => j.id === app.jobId) || {};
                        return (
                            <div key={app.id} className="p-6 hover:bg-slate-50 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className={`h-12 w-12 rounded-lg flex items-center justify-center font-bold text-white shadow-sm ${
                                            job.logo === 'TF' ? 'bg-indigo-600' : 
                                            job.logo === 'G' ? 'bg-blue-600' : 'bg-purple-600'
                                        }`}>
                                            {job.logo || 'Job'}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900">{job.title || 'Unknown Job'}</h3>
                                            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                                                <span className="flex items-center"><Building2 className="h-3 w-3 mr-1"/> {job.company}</span>
                                                <span className="hidden sm:inline">•</span>
                                                <span className="flex items-center"><MapPin className="h-3 w-3 mr-1"/> {job.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-6">
                                        <div className="text-right hidden md:block">
                                            <div className="text-sm text-slate-500 flex items-center justify-end">
                                                <Calendar className="h-3 w-3 mr-1"/> {app.appliedAt}
                                            </div>
                                        </div>
                                        <div>
                                            {getStatusBadge(app.status)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="p-12 text-center text-slate-500">
                    Henüz bir başvuru yapmadınız.
                </div>
            )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CandidateApplicationsPage;
