import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, User, Phone, Plus, X } from 'lucide-react';

interface ContactReference {
  name: string;
  relationship: string;
  phone: string;
}

interface ContactReferenceStepProps {
  references: ContactReference[];
  onReferencesChange: (references: ContactReference[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ContactReferenceStep: React.FC<ContactReferenceStepProps> = ({
  references,
  onReferencesChange,
  onNext,
  onBack
}) => {
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showAdditional, setShowAdditional] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateReference = (reference: ContactReference, index: number) => {
    const newErrors: {[key: string]: string} = {};
    
    if (!reference.name) {
      newErrors[`name${index}`] = 'Por favor ingrese el nombre';
    }
    
    if (!reference.relationship) {
      newErrors[`relationship${index}`] = 'Por favor seleccione el parentesco';
    }
    
    if (!reference.phone) {
      newErrors[`phone${index}`] = 'Por favor ingrese el teléfono';
    } else if (reference.phone.length < 10) {
      newErrors[`phone${index}`] = 'El teléfono debe tener al menos 10 dígitos';
    }
    
    return newErrors;
  };

  const handleAddReference = () => {
    onReferencesChange([
      ...references,
      { name: '', relationship: '', phone: '' }
    ]);
    setShowAdditional(true);
  };

  const handleRemoveReference = (index: number) => {
    const newReferences = references.filter((_, i) => i !== index);
    onReferencesChange(newReferences);
  };

  const handleNext = async () => {
    let newErrors: {[key: string]: string} = {};
    
    // Only validate first reference if additional ones aren't shown
    const referencesToValidate = showAdditional ? references : references.slice(0, 1);
    
    referencesToValidate.forEach((reference, index) => {
      newErrors = { ...newErrors, ...validateReference(reference, index) };
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsLoading(false);
      onNext();
    }
  };

  const relationships = [
    'Padre/Madre',
    'Hermano/a',
    'Hijo/a',
    'Cónyuge',
    'Amigo/a',
    'Otro'
  ];

  return (
    <div className="animate-fade-in py-2">
      <h2 className="text-lg font-light text-center tracking-wide text-gray-800 mb-8">
        Referencias de contacto
      </h2>
      
      <div className="mb-8 space-y-8">
        {references.map((reference, index) => (
          <div key={index} className="relative">
            {index > 0 && (
              <button
                onClick={() => handleRemoveReference(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-2">
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  <label className="text-xs font-light text-gray-700">
                    Nombre completo
                  </label>
                </div>
                
                <input
                  type="text"
                  value={reference.name}
                  onChange={(e) => {
                    const newReferences = [...references];
                    newReferences[index] = { ...reference, name: e.target.value };
                    onReferencesChange(newReferences);
                  }}
                  placeholder="Nombre y apellido"
                  className="form-input"
                />
                {errors[`name${index}`] && (
                  <p className="mt-1 text-xs text-red-500">{errors[`name${index}`]}</p>
                )}
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  <label className="text-xs font-light text-gray-700">
                    Parentesco
                  </label>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {relationships.map((rel) => (
                    <button
                      key={rel}
                      type="button"
                      onClick={() => {
                        const newReferences = [...references];
                        newReferences[index] = { ...reference, relationship: rel };
                        onReferencesChange(newReferences);
                      }}
                      className={`py-2 px-3 rounded-lg text-sm font-light transition-colors ${
                        reference.relationship === rel
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {rel}
                    </button>
                  ))}
                </div>
                {errors[`relationship${index}`] && (
                  <p className="mt-1 text-xs text-red-500">{errors[`relationship${index}`]}</p>
                )}
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <Phone className="w-4 h-4 mr-2 text-blue-600" />
                  <label className="text-xs font-light text-gray-700">
                    Teléfono
                  </label>
                </div>
                
                <input
                  type="tel"
                  value={reference.phone}
                  onChange={(e) => {
                    const newReferences = [...references];
                    newReferences[index] = { ...reference, phone: e.target.value.replace(/\D/g, '') };
                    onReferencesChange(newReferences);
                  }}
                  placeholder="Número de teléfono"
                  inputMode="numeric"
                  className="form-input"
                />
                {errors[`phone${index}`] && (
                  <p className="mt-1 text-xs text-red-500">{errors[`phone${index}`]}</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {!showAdditional && (
          <button
            onClick={handleAddReference}
            className="w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm text-gray-700 flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar otra referencia
          </button>
        )}
        
        <div className="text-xs text-gray-500 bg-gray-50/50 p-4 rounded-lg">
          <p>
            Las referencias de contacto nos ayudan a verificar su identidad. 
            Solo serán contactadas en caso necesario.
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