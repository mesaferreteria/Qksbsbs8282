import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, MapPin } from 'lucide-react';

interface PostalCodeStepProps {
  postalCode: string;
  onPostalCodeChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PostalCodeStep: React.FC<PostalCodeStepProps> = ({
  postalCode,
  onPostalCodeChange,
  onNext,
  onBack
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const validatePostalCode = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    onPostalCodeChange(numericValue);
    
    if (numericValue.length === 0) {
      setError('Por favor ingrese su código postal');
    } else if (numericValue.length !== 4) {
      setError('El código postal debe tener 4 dígitos');
    } else {
      setError(null);
    }
  };
  
  const handleNext = async () => {
    validatePostalCode(postalCode);
    if (postalCode.length === 4) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsLoading(false);
      onNext();
    }
  };

  return (
    <div className="animate-fade-in py-2">
      <h2 className="text-lg font-light text-center tracking-wide text-gray-800 mb-8">
        Código postal
      </h2>
      
      <div className="mb-12">
        <div className="flex items-center mb-2">
          <MapPin className="w-4 h-4 mr-2 text-blue-600" />
          <label className="text-xs font-light text-gray-700">Código postal</label>
        </div>
        
        <div className="mb-6">
          <input
            type="text"
            value={postalCode}
            onChange={(e) => validatePostalCode(e.target.value)}
            placeholder="Ingrese su código postal"
            inputMode="numeric"
            maxLength={4}
            className="w-full px-0 py-2 bg-transparent border-b border-gray-300 focus:border-blue-600 text-gray-800 text-sm placeholder-gray-400 focus:outline-none transition-colors"
          />
          {error && (
            <p className="mt-1 text-xs text-red-500">{error}</p>
          )}
        </div>
        
        <div className="text-xs text-gray-500 bg-gray-50/50 p-4 rounded-lg">
          <p>
            El código postal nos ayuda a verificar la cobertura de nuestros servicios 
            en su área y asignar la sucursal más cercana.
          </p>
        </div>
      </div>
      
      <div className="flex gap-4">
        <button 
          onClick={onBack}
          className="w-1/3 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-light tracking-wide rounded-lg transition-colors flex items-center justify-center group"
        >
          <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver
        </button>
        
        <button 
          onClick={handleNext}
          disabled={isLoading}
          className="w-2/3 py-3.5 bg-black/80 hover:bg-black text-white text-sm font-light tracking-wide rounded-lg shadow-sm transition-all duration-300 hover:shadow-md flex items-center justify-center group relative"
        >
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              Continuar
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};