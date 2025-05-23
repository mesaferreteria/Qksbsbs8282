import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Mail, Phone } from 'lucide-react';

interface ContactInfoStepProps {
  email: string;
  phone: string;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ContactInfoStep: React.FC<ContactInfoStepProps> = ({
  email,
  phone,
  onEmailChange,
  onPhoneChange,
  onNext,
  onBack
}) => {
  const [errors, setErrors] = useState<{
    email?: string;
    phone?: string;
  }>({});
  
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validatePhone = (phone: string) => {
    return phone.length >= 10;
  };
  
  const formatPhone = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    onPhoneChange(numericValue);
  };
  
  const validateForm = () => {
    const newErrors: {
      email?: string;
      phone?: string;
    } = {};
    
    if (!email) {
      newErrors.email = 'Por favor ingrese su correo electrónico';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Por favor ingrese un correo electrónico válido';
    }
    
    if (!phone) {
      newErrors.phone = 'Por favor ingrese su número de teléfono';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Por favor ingrese al menos 10 dígitos';
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
        Información de contacto
      </h2>
      
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <Mail className="w-4 h-4 mr-2 text-blue-600" />
          <label className="text-xs font-light text-gray-700">Correo electrónico</label>
        </div>
        
        <div className="mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="ejemplo@correo.com"
            className="form-input"
          />
          {errors.email && (
            <p className="mt-2 text-xs text-red-500">{errors.email}</p>
          )}
        </div>
        
        <div className="flex items-center mb-2">
          <Phone className="w-4 h-4 mr-2 text-blue-600" />
          <label className="text-xs font-light text-gray-700">Número de teléfono</label>
        </div>
        
        <div className="mb-6">
          <input
            type="tel"
            value={phone}
            onChange={(e) => formatPhone(e.target.value)}
            placeholder="Ingrese su número de teléfono"
            inputMode="numeric"
            className="form-input"
          />
          {errors.phone && (
            <p className="mt-2 text-xs text-red-500">{errors.phone}</p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            Mínimo 10 dígitos. Puede agregar más si lo desea.
          </p>
        </div>
        
        <div className="text-xs text-gray-500 bg-gray-50/50 p-4 rounded-lg">
          <p>
            Le enviaremos información importante sobre su préstamo a estos datos de contacto.
            Asegúrese de que sean correctos.
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
          className="primary-button w-2/3"
        >
          Continuar
          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};