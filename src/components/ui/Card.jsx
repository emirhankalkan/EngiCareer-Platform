import React from 'react';
import { cn } from '../../lib/utils';

export const Card = ({ children, className }) => (
  <div className={cn("bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden", className)}>
    {children}
  </div>
);

export const CardHeader = ({ children, className }) => (
  <div className={cn("px-6 py-4 border-b border-slate-50", className)}>{children}</div>
);

export const CardTitle = ({ children, className }) => (
  <h3 className={cn("text-lg font-semibold text-slate-900", className)}>{children}</h3>
);

export const CardContent = ({ children, className }) => (
  <div className={cn("p-6", className)}>{children}</div>
);

export const CardFooter = ({ children, className }) => (
  <div className={cn("px-6 py-4 bg-slate-50 border-t border-slate-100", className)}>{children}</div>
);
