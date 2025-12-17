import React from 'react';
import { cn } from '../../lib/utils';

export const Badge = ({ children, variant = 'default', className }) => {
  const variants = {
    default: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    outline: 'bg-transparent border-slate-200 text-slate-600',
    secondary: 'bg-slate-100 text-slate-700 border-slate-200',
    success: 'bg-green-50 text-green-700 border-green-100',
  };

  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant], className)}>
      {children}
    </span>
  );
};
