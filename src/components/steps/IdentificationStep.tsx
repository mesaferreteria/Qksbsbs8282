import React, { useState } from 'react';
import { ChevronRight, CreditCard, AlertTriangle } from 'lucide-react';

interface IdentificationStepProps {
  dni: string;
  onDniChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const IdentificationStep: React.FC<IdentificationStepProps> = ({
  dni,
  onDniChange,
  onNext
}) => {
  const [error, setError] = useState<string | null>(null);
  
  const validateDni = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    onDniChange(numericValue);
    
    if (numericValue.length === 0) {
      setError('Por favor ingrese el DNI del titular de la tarjeta');
    } else if (numericValue.length < 7 || numericValue.length > 8) {
      setError('El DNI debe tener entre 7 y 8 dígitos');
    } else {
      setError(null);
    }
  };
  
  const handleNext = () => {
    validateDni(dni);
    if (dni.length >= 7 && dni.length <= 8) {
      onNext();
    }
  };

  return (
    <div className="animate-fade-in py-2">
      <h2 className="text-lg font-light text-center tracking-wide text-gray-800 mb-8">
        Verificación de identidad
      </h2>
      
      <div className="mb-12">
        <div className="flex items-center mb-2">
          <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
          <label className="text-xs font-light text-gray-700">Número de DNI del titular</label>
        </div>
        
        <div className="mb-6">
          <input
            type="text"
            value={dni}
            onChange={(e) => validateDni(e.target.value)}
            placeholder="Ingrese el DNI del titular de la tarjeta"
            inputMode="numeric"
            className="w-full px-0 py-2 bg-transparent border-b border-gray-300 focus:border-blue-600 text-gray-800 text-sm placeholder-gray-400 focus:outline-none transition-colors"
          />
          {error && (
            <div className="mt-2 flex items-start gap-2 text-red-500">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p className="text-xs">{error}</p>
            </div>
          )}
        </div>
        
        <div className="text-xs text-gray-500 bg-gray-50/50 p-4 rounded-lg">
          <p>
            Este dato es necesario para verificar la identidad del titular de la tarjeta y analizar su historial crediticio.
            Toda la información personal está protegida de acuerdo a la ley de protección de datos.
          </p>
        </div>
      </div>
      
      <button 
        onClick={handleNext}
        className="w-full py-3.5 bg-black/80 hover:bg-black text-white text-sm font-light tracking-wide rounded-lg shadow-sm transition-all duration-300 hover:shadow-md flex items-center justify-center group"
      >
        Continuar
        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};