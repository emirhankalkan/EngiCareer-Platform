import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { JobCard } from '../components/JobCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Checkbox } from '../components/ui/Checkbox';
import { Label } from '../components/ui/Label';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Search, MapPin, Filter } from 'lucide-react';
import { JOBS } from '../data/mockData';
import { useJobFilters } from '../hooks/useJobFilters';

import { useAuth } from '../context/AuthContext';

const JobsPage = () => {
  const { user } = useAuth();
  
  // Smart Defaults: Check if user has preferences
  const initialFilters = user?.preferences ? {
      positions: user.preferences.positions || [],
      skills: user.preferences.technologies || []
  } : {};

  // Use custom hook for robust filtering logic
  const {
    filteredJobs,
    searchQuery,
    setSearchQuery,
    locationFilter,
    setLocationFilter,
    filters,
    toggleFilter,
    clearAllFilters
  } = useJobFilters(JOBS, initialFilters, user);

  // Pagination Logic (F-REQ-012)
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  
  const paginatedJobs = filteredJobs.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery, locationFilter]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        
        {/* Search Header */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 mb-8 sticky top-20 z-30">
           <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                 <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                 <Input 
                   placeholder="Pozisyon, şirket veya anahtar kelime..." 
                   className="pl-10"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
              </div>
              <div className="flex-1 relative">
                 <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                 <Input 
                   placeholder="Şehir veya ilçe..." 
                   className="pl-10" 
                   value={locationFilter}
                   onChange={(e) => setLocationFilter(e.target.value)}
                 />
              </div>
              <Button size="lg" className="md:w-32">Ara</Button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           
           {/* Filters Sidebar */}
           <aside className="hidden lg:block space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                 <div className="flex items-center gap-2 mb-6 text-slate-900 font-bold border-b border-slate-100 pb-4">
                    <Filter className="h-5 w-5" /> Filtreler
                 </div>

                 {/* Work Type Filter */}
                 <div className="space-y-4 mb-8">
                    <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">Çalışma Şekli</h3>
                    <div className="space-y-3">
                       {['Tam Zamanlı', 'Yarı Zamanlı', 'Remote', 'Staj', 'Ofis'].map((type) => (
                           <div key={type} className="flex items-center space-x-2">
                             <Checkbox 
                               id={`type-${type}`} 
                               checked={filters.types.includes(type)}
                               onCheckedChange={() => toggleFilter('types', type)}
                             />
                             <Label htmlFor={`type-${type}`}>{type}</Label>
                           </div>
                       ))}
                    </div>
                 </div>

                  {/* Location Category Filter */}
                  <div className="space-y-4 mb-8">
                     <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">Konum</h3>
                     <div className="space-y-3">
                        {['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Eskişehir'].map((loc) => (
                            <div key={loc} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`loc-${loc}`} 
                                checked={filters.locations.includes(loc)}
                                onCheckedChange={() => toggleFilter('locations', loc)}
                              />
                              <Label htmlFor={`loc-${loc}`}>{loc}</Label>
                            </div>
                        ))}
                     </div>
                  </div>

                  {/* Position Filter (New) */}
                  <div className="space-y-4 mb-8">
                     <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">Pozisyon</h3>
                     <div className="space-y-3">
                        {['Backend Developer', 'Frontend Developer', 'Full Stack', 'Mobile Developer', 'DevOps', 'Stajyer', 'Team Lead'].map((pos) => (
                            <div key={pos} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`pos-${pos}`} 
                                checked={filters.positions?.includes(pos)} 
                                onCheckedChange={() => toggleFilter('positions', pos)}
                              />
                              <Label htmlFor={`pos-${pos}`}>{pos}</Label>
                            </div>
                        ))}
                     </div>
                  </div>

                  {/* Tech Stack Filter (Expanded) */}
                  <div className="space-y-4">
                     <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">Teknolojiler</h3>
                     <div className="space-y-3">
                        {['React', 'Vue.js', 'Angular', 'Java', 'Spring Boot', '.NET', 'Python', 'Node.js', 'AWS', 'Docker', 'SQL'].map((tech) => (
                            <div key={tech} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`tech-${tech}`} 
                                checked={filters.skills.includes(tech)}
                                onCheckedChange={() => toggleFilter('skills', tech)}
                              />
                              <Label htmlFor={`tech-${tech}`}>{tech}</Label>
                            </div>
                        ))}
                     </div>
                  </div>

              </div>
           </aside>

           {/* Job List */}
           <div className="lg:col-span-3 space-y-6">
              
              {/* Personalized Suggestions (New Requirement) */}
              {user?.role === 'candidate' && (
                <Card className="p-6 bg-indigo-600 text-white overflow-hidden relative group">
                   <div className="absolute right-[-20px] top-[-20px] h-40 w-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform" />
                   <h3 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10">
                      ✨ Sizin İçin Akıllı Eşleşmeler
                   </h3>
                   <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide relative z-10">
                      {JOBS.filter(j => j.matchScore > 80).slice(0, 3).map(job => (
                        <div key={job.id} className="min-w-[280px] bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
                           <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold truncate pr-8">{job.title}</h4>
                              <Badge className="bg-white text-indigo-600 border-0 text-[10px] font-bold">%{job.matchScore} Match</Badge>
                           </div>
                           <p className="text-xs text-indigo-100 mb-3">{job.company}</p>
                           <div className="flex flex-wrap gap-1 mb-4">
                              {job.skills.slice(0, 2).map((s, i) => (
                                <span key={i} className="text-[10px] bg-white/20 px-2 py-0.5 rounded text-white">{s}</span>
                              ))}
                           </div>
                           <Link to={`/jobs/${job.id}`}>
                              <Button size="sm" variant="secondary" className="w-full bg-white text-indigo-600 hover:bg-indigo-50 border-0 text-xs font-bold">Detaylara Git</Button>
                           </Link>
                        </div>
                      ))}
                   </div>
                </Card>
              )}

              <div className="flex justify-between items-center mb-4">
                 <h2 className="font-bold text-slate-800 text-lg">
                    {filteredJobs.length} İlan bulundu
                 </h2>
                 <span className="text-sm text-slate-500">
                    En son eklenenler
                 </span>
              </div>

              {paginatedJobs.length > 0 ? (
                  paginatedJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))
              ) : (
                  <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                      <h3 className="text-lg font-medium text-slate-900">Aradığınız kriterlere uygun ilan bulunamadı.</h3>
                      <p className="text-slate-500 mt-2">Filtreleri temizleyerek tekrar deneyebilirsiniz.</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={clearAllFilters}
                      >
                        Filtreleri Temizle
                      </Button>
                  </div>
              )}
           </div>

        </div>
            {/* Pagination Controls (F-REQ-012) */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8 pb-12">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  Önceki
                </Button>
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(i + 1)}
                    className="w-10 text-xs"
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  Sonraki
                </Button>
              </div>
            )}
      </main>
      <Footer />
    </div>
  );
};

export default JobsPage;
