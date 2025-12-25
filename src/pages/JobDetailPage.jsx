import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { MapPin, Clock, Building2, Banknote, Share2, ArrowLeft, Users as UsersIcon, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { JOBS, APPLICATIONS } from '../data/mockData';
import { calculateMatchScore } from '../utils/matchingAlgorithm';

const JobDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  // Get job from mock data (F-REQ-014)
  const job = JOBS.find(j => j.id === parseInt(id)) || JOBS[0];
  
  // Calculate application count (F-REQ-014)
  const applicationCount = APPLICATIONS.filter(app => app.jobId === job.id).length;
  
  // Check if already applied (F-REQ-020)
  const hasApplied = APPLICATIONS.some(app => app.jobId === job.id && app.candidateId === user?.id);
  const [isApplying, setIsApplying] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(hasApplied);

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
        setIsApplying(false);
        setShowSuccess(true);
    }, 1500);
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
                    <div className="flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-full text-indigo-700 font-medium">
                      <UsersIcon className="h-4 w-4" /> {applicationCount} Başvuru
                    </div>
                    {user?.role === 'candidate' && (
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold ${
                           calculateMatchScore(user, job) >= 80 ? 'bg-green-100 text-green-700' : 
                           calculateMatchScore(user, job) >= 50 ? 'bg-yellow-100 text-yellow-700' :
                           'bg-slate-100 text-slate-600'
                        }`}>
                           %{calculateMatchScore(user, job)} Uyum Skorunuz
                        </div>
                     )}
                 </div>

                  <div className="prose prose-slate max-w-none">
                     <h3 className="text-lg font-bold text-slate-900 mb-4">İş Tanımı</h3>
                     <div className="text-slate-600 mb-6">{job.description}</div>

                     {(job.requirements && job.requirements.length > 0) && (
                        <>
                           <h3 className="text-lg font-bold text-slate-900 mb-4">Aranan Nitelikler</h3>
                           <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
                              {job.requirements.map((req, i) => (
                                 <li key={i}>{req}</li>
                              ))}
                           </ul>
                        </>
                     )}

                     {(job.responsibilities && job.responsibilities.length > 0) && (
                        <>
                           <h3 className="text-lg font-bold text-slate-900 mb-4">Sorumluluklar</h3>
                           <ul className="list-disc pl-5 space-y-2 text-slate-600">
                              {job.responsibilities.map((resp, i) => (
                                 <li key={i}>{resp}</li>
                              ))}
                           </ul>
                        </>
                     )}
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
                 
                 <Button 
                   className="w-full mb-4" 
                   size="lg" 
                   onClick={handleApply}
                   disabled={isApplying || showSuccess}
                 >
                   {isApplying ? 'Başvuruluyor...' : showSuccess ? 'Başvuruldu' : 'Hemen Başvur'}
                 </Button>
                 <Button variant="secondary" className="w-full" onClick={() => showSuccess ? null : alert('İlan kaydedildi!')}>
                   {showSuccess ? 'Kaydedildi' : 'Kaydet'}
                 </Button>
                 
                 {showSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 p-3 bg-green-50 border border-green-100 rounded-lg flex items-center gap-2 text-green-700 text-sm font-medium"
                    >
                      <CheckCircle className="h-4 w-4" /> Başvurunuz başarıyla iletildi!
                    </motion.div>
                 )}
                 
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
