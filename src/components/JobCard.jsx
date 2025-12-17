import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building2, Clock, Banknote } from 'lucide-react';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle } from './ui/Card'; // CardHeader and CardTitle added

export const JobCard = ({ job }) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200 border-slate-200 group">
      <CardHeader className="p-6 pb-4"> {/* Added p-6 pb-4 to maintain padding and spacing */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex gap-4">
            <div className={`h-12 w-12 rounded-lg flex items-center justify-center font-bold text-white shadow-sm ${
              job.logo === 'TF' ? 'bg-indigo-600' : 
              job.logo === 'G' ? 'bg-blue-600' : 'bg-purple-600'
            }`}>
              {job.logo}
            </div>
            <div>
              <CardTitle className="text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                {/* Link removed as per the provided snippet, assuming CardTitle itself is not a link */}
                {job.title}
              </CardTitle>
              <div className="text-slate-500 text-sm font-medium mt-1">{job.company}</div> {/* Changed from p to div, added mt-1 */}
            </div>
          </div>
          {/* Match Score Badge */}
          <div className="flex flex-col items-end gap-2">
             {job.matchScore && (
                 <Badge variant="outline" className={`
                    ${job.matchScore >= 80 ? 'border-green-200 text-green-700 bg-green-50' : 
                      job.matchScore >= 50 ? 'border-yellow-200 text-yellow-700 bg-yellow-50' :
                      'border-slate-200 text-slate-600 bg-slate-50'}
                 `}>
                    %{job.matchScore} Uyum
                 </Badge>
             )}
             <Badge variant={job.type === 'Staj' ? 'secondary' : 'outline'} className="text-xs font-normal">
               {job.type}
             </Badge>
          </div>
        </div>
      </CardHeader>
      <div className="p-6 pt-0"> {/* Adjusted padding to account for CardHeader */}
        <div className="mt-4 flex flex-wrap gap-y-2 gap-x-4 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {job.location}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {job.postedAt}
          </div>
          <div className="flex items-center gap-1">
            <Banknote className="h-4 w-4" />
            {job.salary}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs font-normal">
              {skill}
            </Badge>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">Son 24 saatte 12 başvuru</span>
            <Button size="sm" className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity bg-indigo-600 text-white hover:bg-indigo-700">Başvur</Button>
        </div>
      </div>
    </Card>
  );
};
