import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building2, Clock, Banknote } from 'lucide-react';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export const JobCard = ({ job }) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200 border-slate-200 group">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200 group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-colors">
              <Building2 className="h-6 w-6 text-slate-500 group-hover:text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                <Link to={`/jobs/${job.id}`}>{job.title}</Link>
              </h3>
              <p className="text-slate-500 font-medium">{job.company}</p>
            </div>
          </div>
          <Badge variant={job.type === 'Staj' ? 'secondary' : 'default'}>
            {job.type}
          </Badge>
        </div>

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
            <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">Başvur</Button>
        </div>
      </div>
    </Card>
  );
};
