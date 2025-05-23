import React from 'react';
import { Shield, Lock, CheckCircle } from 'lucide-react';

export const SecurityBadges: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-6 py-4 px-6 bg-gray-50/50 rounded-lg mb-8">
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-green-600" />
        <span className="text-xs text-gray-600 font-light">Sitio Seguro</span>
      </div>
      <div className="flex items-center gap-2">
        <Lock className="w-4 h-4 text-blue-600" />
        <span className="text-xs text-gray-600 font-light">Datos Encriptados</span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-emerald-600" />
        <span className="text-xs text-gray-600 font-light">Verificado</span>
      </div>
    </div>
  );
};