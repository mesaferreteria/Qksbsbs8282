import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Briefcase, GraduationCap, Building, FileText, Users, Heart } from 'lucide-react';

interface OccupationStepProps {
  occupation: string;
  onOccupationChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const OccupationStep: React.FC<OccupationStepProps> = ({
  occupation,
  onOccupationChange,
  onNext,
  onBack
}) => {
  const [error, setError] = useState<string | null>(null);
  
  const validateForm = () => {
    if (!occupation) {
      setError('Por favor seleccione su situación laboral');
      return false;
    }
    setError(null);
    return true;
  };
  
  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const occupations = [
    { id: 'empleado', label: 'Empleado en relación de dependencia', icon: <Briefcase className="w-6 h-6" /> },
    { id: 'monotributista', label: 'Monotributista / Autónomo', icon: <FileText className="w-6 h-6" /> },
    { id: 'empleador', label: 'Empleador / Empresario', icon: <Building className="w-6 h-6" /> },
    { id: 'jubilado', label: 'Jubilado / Pensionado', icon: <Heart className="w-6 h-6" /> },
    { id: 'desempleado', label: 'Desempleado', icon: <Users className="w-6 h-6" /> },
    { id: 'estudiante', label: 'Estudiante', icon: <GraduationCap className="w-6 h-6" /> }
  ];

  return (
    <div className="animate-fade-in py-2">
      <h2 className="text-lg font-light text-center tracking-wide text-gray-800 mb-8">
        Situación laboral
      </h2>
      
      <div className="mb-8">
        <div className="flex flex-wrap -mx-2">
          {occupations.map((item) => (
            <div key={item.id} className="w-1/2 px-2 mb-4">
              <button
                type="button"
                onClick={() => {
                  onOccupationChange(item.id);
                  setError(null);
                }}
                className={`w-full h-28 flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 ${
                  occupation === item.id
                    ? 'bg-blue-50 border-2 border-blue-600 text-blue-800'
                    : 'bg-white/60 border border-gray-200 hover:border-blue-300 text-gray-700'
                }`}
              >
                <div className={`mb-2 ${occupation === item.id ? 'text-blue-600' : 'text-gray-500'}`}>
                  {item.icon}
                </div>
                <span className="text-xs text-center font-light">{item.label}</span>
              </button>
            </div>
          ))}
        </div>
        
        {error && (
          <p className="mt-1 text-xs text-red-500 text-center">{error}</p>
        )}
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
          className="w-2/3 py-3.5 bg-black/80 hover:bg-black text-white text-sm font-light tracking-wide rounded-lg shadow-sm transition-all duration-300 hover:shadow-md flex items-center justify-center group"
        >
          Continuar
          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};