import React, { useState } from 'react';
import { Check, ChevronLeft } from 'lucide-react';
import { LoanFormData } from '../../types/formTypes';

interface SummaryStepProps {
  formData: LoanFormData;
  onSubmit: () => void;
  onBack: () => void;
}

export const SummaryStep: React.FC<SummaryStepProps> = ({
  formData,
  onSubmit,
  onBack
}) => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Calculate monthly payment
  const interestRate = 0.039; // 3.9% monthly interest
  const monthlyPayment = (formData.loanAmount * (interestRate * Math.pow(1 + interestRate, formData.loanTerm))) / 
                         (Math.pow(1 + interestRate, formData.loanTerm) - 1);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const handleSubmit = async () => {
    if (!agreeTerms) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit();
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in py-2">
      <h2 className="text-lg font-light text-center tracking-wide text-gray-800 mb-6">
        Resumen de su préstamo
      </h2>
      
      <div className="mb-8">
        <div className="bg-blue-50/70 rounded-lg p-5 mb-6">
          <h3 className="text-sm font-medium text-gray-800 mb-4">Detalle del préstamo</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Monto del préstamo</p>
              <p className="text-sm font-medium text-gray-800">{formatCurrency(formData.loanAmount)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Plazo</p>
              <p className="text-sm font-medium text-gray-800">{formData.loanTerm} meses</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Cuota mensual</p>
              <p className="text-sm font-medium text-gray-800">{formatCurrency(monthlyPayment)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Tasa</p>
              <p className="text-sm font-medium text-gray-800">46.8% anual</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-800 mb-3">Información personal</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Nombre completo</p>
              <p className="text-sm text-gray-800">{formData.firstName} {formData.lastName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">DNI</p>
              <p className="text-sm text-gray-800">{formData.dni}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Provincia</p>
              <p className="text-sm text-gray-800">{formData.province}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Correo electrónico</p>
              <p className="text-sm text-gray-800">{formData.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Teléfono</p>
              <p className="text-sm text-gray-800">{formData.phone}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-800 mb-3">Información laboral</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Situación laboral</p>
              <p className="text-sm text-gray-800 capitalize">{formData.occupation}</p>
            </div>
            {['empleado', 'monotributista', 'empleador'].includes(formData.occupation) && (
              <>
                <div>
                  <p className="text-xs text-gray-500 mb-1">
                    {formData.occupation === 'empleado' ? 'Empresa' : 'Negocio'}
                  </p>
                  <p className="text-sm text-gray-800">{formData.occupationDetails.company}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">
                    {formData.occupation === 'empleado' ? 'Cargo' : 'Actividad'}
                  </p>
                  <p className="text-sm text-gray-800">{formData.occupationDetails.position}</p>
                </div>
              </>
            )}
            <div>
              <p className="text-xs text-gray-500 mb-1">Ingreso mensual</p>
              <p className="text-sm text-gray-800">{formatCurrency(Number(formData.occupationDetails.monthlySalary))}</p>
            </div>
            {['empleado', 'monotributista', 'empleador', 'jubilado'].includes(formData.occupation) && (
              <div>
                <p className="text-xs text-gray-500 mb-1">
                  {formData.occupation === 'jubilado' 
                    ? 'Años como jubilado' 
                    : 'Antigüedad (años)'}
                </p>
                <p className="text-sm text-gray-800">{formData.occupationDetails.yearsEmployed}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-8">
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
            </div>
            <span className="text-xs text-gray-700 leading-relaxed">
              He leído y acepto los términos y condiciones, y autorizo a CrediArg a verificar mi 
              información y consultar mi historial crediticio. Entiendo que esta solicitud no 
              garantiza la aprobación del préstamo.
            </span>
          </label>
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
          onClick={handleSubmit}
          disabled={!agreeTerms || isSubmitting}
          className={`w-2/3 py-3.5 text-white text-sm font-light tracking-wide rounded-lg shadow-sm transition-all duration-300 flex items-center justify-center group ${
            agreeTerms && !isSubmitting
              ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </>
          ) : (
            <>
              Finalizar solicitud
              <Check className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};