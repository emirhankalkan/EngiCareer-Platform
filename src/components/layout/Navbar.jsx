import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Briefcase, UserCircle } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
              <Briefcase className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              TechArchive
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Ana Sayfa</Link>
          <Link to="/jobs" className="hover:text-indigo-600 transition-colors">İlanlar</Link>
          <Link to="/companies" className="hover:text-indigo-600 transition-colors">Şirketler</Link>
          <Link to="/about" className="hover:text-indigo-600 transition-colors">Hakkımızda</Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
             <Link to="/login">
                <Button variant="ghost" size="sm">Giriş Yap</Button>
             </Link>
             <Link to="/register">
                <Button variant="primary" size="sm">Kayıt Ol</Button>
             </Link>
          </div>
          <div className="md:hidden">
             {/* Mobile/Menu Icon would go here - simplified for MVP */}
             <UserCircle className="h-6 w-6 text-slate-600" />
          </div>
        </div>
      </div>
    </nav>
  );
};
