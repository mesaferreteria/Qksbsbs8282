import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';

interface RejectionMessageProps {
  onRetry: () => void;
}

export const RejectionMessage: React.FC<RejectionMessageProps> = ({ onRetry }) => {
  return (
    <div className="animate-fade-in py-8">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        
        <h2 className="text-xl font-light text-gray-800 mb-4">
          Verificación rechazada
        </h2>
        
        <p className="text-sm text-gray-600 leading-relaxed max-w-md mb-6">
          Lo sentimos, no pudimos verificar el historial crediticio de la tarjeta ingresada.
          Por favor, intente con otra tarjeta que tenga un historial verificable.
        </p>
      </div>

      <button 
        onClick={onRetry}
        className="w-full py-3.5 bg-black/80 hover:bg-black text-white text-sm font-light tracking-wide rounded-lg shadow-sm transition-all duration-300 hover:shadow-md flex items-center justify-center group"
      >
        Intentar con otra tarjeta
        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};