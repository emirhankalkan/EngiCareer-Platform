import React from 'react';
import { cn } from '../../lib/utils';

export const Label = ({ children, htmlFor, className }) => (
  <label 
    htmlFor={htmlFor} 
    className={cn("text-sm font-medium leading-none text-slate-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block", className)}
  >
    {children}
  </label>
);
