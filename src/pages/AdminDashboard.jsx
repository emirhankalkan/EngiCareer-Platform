import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Check, X, Shield, AlertCircle } from 'lucide-react';
import { JOBS } from '../data/mockData';

const AdminDashboard = () => {
    // F-REQ-011: İlanlar Admin onayından sonra yayınlanmalıdır
    const [pendingJobs, setPendingJobs] = useState(JOBS.map(j => ({ ...j, status: j.status || 'Active' })));
    
    // Simulate some pending jobs if none exist
    const mockPending = [
        { id: 9991, company: 'New startups Inc', title: 'Vue Developer', location: 'Ankara', status: 'Admin Approval', skills: ['Vue', 'CSS'] },
        { id: 9992, company: 'Legacy Bank', title: 'Cobol Specialist', location: 'İstanbul', status: 'Admin Approval', skills: ['Cobol', 'DB2'] }
    ];

    const [allJobs, setAllJobs] = useState([...pendingJobs, ...mockPending]);

    const handleApproval = (id, approve) => {
        setAllJobs(prev => prev.map(job => 
            job.id === id ? { ...job, status: approve ? 'Active' : 'Rejected' } : job
        ));
    };

    const pending = allJobs.filter(j => j.status === 'Admin Approval');

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Navbar />
            
            <main className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                        <Shield className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Admin Kontrol Paneli</h1>
                        <p className="text-slate-500">Sistem genelindeki ilan onay süreçlerini yönetin.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-amber-500" /> Onay Bekleyen İlanlar ({pending.length})
                            </h2>
                        </div>

                        {pending.length > 0 ? (
                            <div className="divide-y divide-slate-100">
                                {pending.map(job => (
                                    <div key={job.id} className="py-4 flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-slate-900">{job.title}</h3>
                                            <p className="text-sm text-slate-500">{job.company} • {job.location}</p>
                                            <div className="flex gap-2 mt-2">
                                                {job.skills?.map(s => (
                                                    <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button 
                                                variant="outline" 
                                                className="border-green-200 text-green-600 hover:bg-green-50"
                                                onClick={() => handleApproval(job.id, true)}
                                            >
                                                <Check className="h-4 w-4 mr-2" /> Onayla
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                className="border-red-200 text-red-600 hover:bg-red-50"
                                                onClick={() => handleApproval(job.id, false)}
                                            >
                                                <X className="h-4 w-4 mr-2" /> Reddet
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-400">
                                Onay bekleyen ilan bulunmuyor.
                            </div>
                        )}
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Sistem İstatistikleri</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <p className="text-xs text-slate-500 font-bold uppercase mb-1">Toplam İlan</p>
                                <p className="text-2xl font-bold text-slate-900">{allJobs.length}</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <p className="text-xs text-slate-500 font-bold uppercase mb-1">Aktif Adaylar</p>
                                <p className="text-2xl font-bold text-slate-900">1,248</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <p className="text-xs text-slate-500 font-bold uppercase mb-1">Yeni Şirketler</p>
                                <p className="text-2xl font-bold text-slate-900">12</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
