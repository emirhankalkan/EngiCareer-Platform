import React from 'react';
import { Briefcase, Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Briefcase className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-slate-900">TechArchive</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Mühendislik ve IT dünyasında kariyerinizi şekillendirin. En iyi şirketlerle yeteneklerinizi buluşturuyoruz.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Platform</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to="/jobs" className="hover:text-indigo-600">İş İlanları</Link></li>
              <li><Link to="/companies" className="hover:text-indigo-600">Şirketler</Link></li>
              <li><Link to="/pricing" className="hover:text-indigo-600">Fiyatlandırma</Link></li>
              <li><Link to="/about" className="hover:text-indigo-600">Hakkımızda</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Kaynaklar</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to="/blog" className="hover:text-indigo-600">Blog</Link></li>
              <li><Link to="/guide" className="hover:text-indigo-600">Kariyer Rehberi</Link></li>
              <li><Link to="/help" className="hover:text-indigo-600">Yardım Merkezi</Link></li>
              <li><Link to="/privacy" className="hover:text-indigo-600">Gizlilik Politikası</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">İletişim</h3>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2025 TechArchive. Tüm hakları saklıdır.
          </p>
          <p className="text-slate-400 text-sm flex gap-1">
             Designed by <span className="text-slate-600 font-medium">Group 4</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
