import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { JobCard } from '../components/JobCard';
import { Input } from '../components/ui/Input';
import { Checkbox } from '../components/ui/Checkbox';
import { Label } from '../components/ui/Label';
import { Search, MapPin, Filter } from 'lucide-react';

const MOCK_JOBS = [
  {
    id: 1,
    title: 'Junior React Developer',
    company: 'TechFlow Yazılım',
    location: 'İstanbul (Hibrit)',
    type: 'Tam Zamanlı',
    salary: '₺25.000 - ₺35.000',
    postedAt: '2 gün önce',
    skills: ['React', 'TypeScript', 'Tailwind', 'Redux']
  },
  {
    id: 2,
    title: 'Yazılım Stajyeri (Backend)',
    company: 'FinTech Solutions',
    location: 'Ankara (Ofis)',
    type: 'Staj',
    salary: 'Maaş Belirtilmemiş',
    postedAt: 'Yeni',
    skills: ['Java', 'Spring Boot', 'PostgreSQL']
  },
  {
    id: 3,
    title: 'Full Stack Engineer',
    company: 'Global Data Corp',
    location: 'İzmir (Remote)',
    type: 'Tam Zamanlı',
    salary: '₺50.000 - ₺70.000',
    postedAt: '1 hafta önce',
    skills: ['Node.js', 'React', 'MongoDB', 'AWS']
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'CloudNine',
    location: 'Remote',
    type: 'Tam Zamanlı',
    salary: '₺60.000+',
    postedAt: '3 gün önce',
    skills: ['Docker', 'Kubernetes', 'CI/CD']
  },
   {
    id: 5,
    title: 'Uzun Dönem Stajyer',
    company: 'CyberSafe',
    location: 'İstanbul',
    type: 'Staj',
    salary: 'Asgari Ücret',
    postedAt: '5 saat önce',
    skills: ['Python', 'Networking', 'Linux']
  }
];

const JobsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-slate-900 font-semibold">
                    <Filter className="h-5 w-5" /> Filtrele
                </div>
                
                {/* Filter Sections */}
                <div className="space-y-6">
                    <div>
                        <h4 className="text-sm font-medium text-slate-900 mb-3">Çalışma Şekli</h4>
                        <div className="space-y-2">
                           {['Tam Zamanlı', 'Yarı Zamanlı', 'Staj', 'Freelance'].map(item => (
                               <div key={item} className="flex items-center gap-2">
                                  <Checkbox id={item} />
                                  <label htmlFor={item} className="text-sm text-slate-600">{item}</label>
                               </div>
                           ))}
                        </div>
                    </div>

                    <div className="border-t border-slate-100 pt-6">
                        <h4 className="text-sm font-medium text-slate-900 mb-3">Konum</h4>
                        <div className="space-y-2">
                           {['İstanbul', 'Ankara', 'İzmir', 'Remote'].map(item => (
                               <div key={item} className="flex items-center gap-2">
                                  <Checkbox id={item} />
                                  <label htmlFor={item} className="text-sm text-slate-600">{item}</label>
                               </div>
                           ))}
                        </div>
                    </div>

                    <div className="border-t border-slate-100 pt-6">
                        <h4 className="text-sm font-medium text-slate-900 mb-3">Teknolojiler</h4>
                        <div className="space-y-2">
                           {['React', 'Java', 'Python', 'Node.js', '.NET'].map(item => (
                               <div key={item} className="flex items-center gap-2">
                                  <Checkbox id={item} />
                                  <label htmlFor={item} className="text-sm text-slate-600">{item}</label>
                               </div>
                           ))}
                        </div>
                    </div>
                </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
             {/* Search Header */}
             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                   <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                   <Input placeholder="Pozisyon adı, şirket veya yetenek ara..." className="pl-10 border-slate-200" />
                </div>
                 <div className="w-full sm:w-48 relative">
                   <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                   <Input placeholder="Şehir" className="pl-10 border-slate-200" />
                </div>
             </div>

             {/* Results Count */}
             <div className="mb-4 text-slate-600 text-sm">
                <strong>{MOCK_JOBS.length}</strong> ilan bulundu
             </div>

             {/* Job List */}
             <div className="space-y-4">
                {MOCK_JOBS.map(job => (
                   <JobCard key={job.id} job={job} />
                ))}
             </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobsPage;
