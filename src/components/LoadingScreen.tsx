import React from 'react';
import { CreditCard } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <CreditCard className="w-12 h-12 text-blue-600 animate-pulse" />
      <h2 className="mt-4 text-xl font-light tracking-widest text-gray-800">CrediArg</h2>
      <div className="mt-8 relative h-1 w-40 bg-gray-200 rounded-full overflow-hidden">
        <div className="absolute top-0 left-0 h-full bg-blue-600 animate-progress-bar"></div>
      </div>
      <p className="mt-4 text-xs font-light text-gray-500">Iniciando...</p>
    </div>
  );
};