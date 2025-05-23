import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, User } from 'lucide-react';

interface PersonalInfoStepProps {
  firstName: string;
  lastName: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
  onNext,
  onBack
}) => {
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
  }>({});
  
  const validateForm = () => {
    const newErrors: {
      firstName?: string;
      lastName?: string;
    } = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = 'Por favor ingrese su nombre';
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = 'Por favor ingrese su apellido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="animate-fade-in py-2">
      <h2 className="text-lg font-light text-center tracking-wide text-gray-800 mb-8">
        Información personal
      </h2>
      
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <User className="w-4 h-4 mr-2 text-blue-600" />
          <label className="text-xs font-light text-gray-700">Nombre y apellido</label>
        </div>
        
        <div className="mb-6">
          <input
            type="text"
            value={firstName}
            onChange={(e) => onFirstNameChange(e.target.value)}
            placeholder="Nombre"
            className="form-input"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
          )}
        </div>
        
        <div className="mb-6">
          <input
            type="text"
            value={lastName}
            onChange={(e) => onLastNameChange(e.target.value)}
            placeholder="Apellido"
            className="form-input"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
          )}
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
          className="primary-button w-2/3"
        >
          Continuar
          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};