import React from 'react';
import { CreditCard } from 'lucide-react';

export const FloatingLogo: React.FC = () => {
  return (
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-float z-10">
      <div className="flex items-center gap-2 bg-black/5 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
        <CreditCard className="w-5 h-5 text-blue-600" />
        <h1 className="text-xl font-light tracking-widest text-gray-900">CrediArg</h1>
      </div>
      <div className="mt-1 text-xs font-light text-gray-600 tracking-wider">
        Soluciones financieras personales
      </div>
    </div>
  );
};