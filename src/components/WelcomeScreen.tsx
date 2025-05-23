import React from 'react';
import { ChevronRight, Wallet, Calculator, Check } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  return (
    <div className="py-10 animate-fade-in">
      <h2 className="text-2xl font-light text-center mb-10 tracking-wide text-gray-800">
        Bienvenido a CrediArg
      </h2>
      
      <div className="flex flex-col gap-8 mb-12">
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <Wallet className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-800 mb-1">Proceso Simple</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Complete el formulario y obtenga su préstamo personal en minutos.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <Calculator className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-800 mb-1">Personalice su Préstamo</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Elija el monto y plazo que mejor se adapte a sus necesidades.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <Check className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-800 mb-1">Verificación Segura</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Verificamos su identidad para ofrecerle las mejores condiciones.
            </p>
          </div>
        </div>
      </div>
      
      <button 
        onClick={onComplete}
        className="w-full py-3.5 px-6 bg-black/80 hover:bg-black text-white text-sm font-light tracking-wide rounded-lg shadow-sm transform transition-all duration-300 hover:shadow-md flex items-center justify-center group"
      >
        Comenzar
        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};