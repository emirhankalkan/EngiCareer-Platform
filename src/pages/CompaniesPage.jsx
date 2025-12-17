import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Building2, MapPin, Users, ArrowRight } from 'lucide-react';
import { COMPANIES } from '../data/mockData';

/**
 * COMPANIES PAGE
 * 
 * Displays a grid of partner companies registered on the platform.
 * Allows candidates to explore companies by industry and size.
 */
const CompaniesPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
           <h1 className="text-3xl font-bold text-slate-900 mb-4">Partner Şirketler</h1>
           <p className="text-lg text-slate-600">
             Sektörün önde gelen teknoloji şirketlerini keşfedin ve hayalinizdeki ofisi bulun.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {COMPANIES.map((company) => (
             <Card key={company.id} className="hover:shadow-md transition-shadow group">
               <CardHeader className="flex flex-row items-center gap-4 pb-2">
                 <div className="h-16 w-16 rounded-xl bg-indigo-100 flex items-center justify-center text-xl font-bold text-indigo-700 border border-indigo-200">
                    {company.logo}
                 </div>
                 <div>
                   <CardTitle className="text-lg group-hover:text-indigo-600 transition-colors">
                     {company.name}
                   </CardTitle>
                   <p className="text-sm text-slate-500 font-medium">{company.industry}</p>
                 </div>
               </CardHeader>
               
               <CardContent className="space-y-4">
                 <p className="text-slate-600 text-sm line-clamp-2 min-h-[40px]">
                   {company.description}
                 </p>
                 
                 <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded">
                       <MapPin className="h-3 w-3" /> {company.location}
                    </div>
                    <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded">
                       <Users className="h-3 w-3" /> {company.employees} Çalışan
                    </div>
                 </div>

                 <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100">
                       {company.activeJobs} Açık İlan
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-slate-400 group-hover:text-indigo-600">
                       İncele <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                 </div>
               </CardContent>
             </Card>
           ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompaniesPage;
