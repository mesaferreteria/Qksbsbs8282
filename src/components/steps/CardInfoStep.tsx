import React, { useState } from 'react';
import { Building2, CreditCard, Calendar, User, Lock, AlertTriangle } from 'lucide-react';
import { Card3D } from '../Card3D';
import { motion } from 'framer-motion';

interface CardInfo {
  type: 'credit' | 'debit';
  number: string;
  name: string;
  expiry: string;
  cvv: string;
  bank?: string;
}

interface CardInfoStepProps {
  cardInfo: CardInfo;
  onCardInfoChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  isRetry?: boolean;
}

export const CardInfoStep: React.FC<CardInfoStepProps> = ({
  cardInfo,
  onCardInfoChange,
  onNext,
  onBack,
  isRetry = false
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const formatCardNumber = (value: string) => {
    const numeric = value.replace(/\D/g, '');
    const groups = numeric.match(/.{1,4}/g) || [];
    return groups.join(' ').substr(0, 19);
  };

  const formatExpiry = (value: string) => {
    const numeric = value.replace(/\D/g, '');
    if (numeric.length >= 2) {
      return `${numeric.slice(0, 2)}/${numeric.slice(2, 4)}`;
    }
    return numeric;
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!cardInfo.type) {
      newErrors.type = 'Seleccione el tipo de tarjeta';
    }

    if (!cardInfo.bank) {
      newErrors.bank = 'Seleccione el banco emisor';
    }

    if (!cardInfo.number || cardInfo.number.replace(/\s/g, '').length < 16) {
      newErrors.number = 'Ingrese un número de tarjeta válido';
    }

    if (!cardInfo.name) {
      newErrors.name = 'Ingrese el nombre del titular';
    }

    if (!cardInfo.expiry || cardInfo.expiry.length < 5) {
      newErrors.expiry = 'Ingrese una fecha válida';
    } else {
      const [month, year] = cardInfo.expiry.split('/');
      if (parseInt(month) > 12 || parseInt(month) < 1) {
        newErrors.expiry = 'Mes inválido';
      }
    }

    if (!cardInfo.cvv || cardInfo.cvv.length < 3) {
      newErrors.cvv = 'Ingrese un CVV válido';
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
      <h2 className="text-lg font-light text-center tracking-wide text-gray-800 mb-6">
        Información de tarjeta
      </h2>

      {isRetry && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 font-medium mb-1">
                Tarjeta rechazada
              </p>
              <p className="text-sm text-amber-700">
                La tarjeta anterior fue rechazada. Por favor, ingrese una nueva tarjeta para continuar.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <Card3D
        cardNumber={cardInfo.number}
        cardName={cardInfo.name}
        cardExpiry={cardInfo.expiry}
        cardCvv={cardInfo.cvv}
        isFlipped={isFlipped}
        type={cardInfo.type}
      />

      <div className="space-y-6 mb-8">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
              <label className="text-xs font-light text-gray-700">Tipo de tarjeta</label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {['credit', 'debit'].map((type) => (
              <button
                key={type}
                onClick={() => onCardInfoChange('type', type)}
                className={`py-2.5 px-4 rounded-xl text-sm font-light transition-all duration-200 ${
                  cardInfo.type === type
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                {type === 'credit' ? 'Crédito' : 'Débito'}
              </button>
            ))}
          </div>
          {errors.type && (
            <div className="mt-2 flex items-start gap-2 text-red-500">
              <AlertTriangle className="w-3 h-3 mt-0.5" />
              <p className="text-xs">{errors.type}</p>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center mb-2">
            <Building2 className="w-4 h-4 mr-2 text-blue-600" />
            <label className="text-xs font-light text-gray-700">Banco emisor</label>
          </div>
          
          <select
            value={cardInfo.bank || ''}
            onChange={(e) => onCardInfoChange('bank', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer hover:bg-gray-100"
            autoComplete="cc-type"
          >
            <option value="">Seleccione su banco</option>
            <option value="santander">Banco Santander</option>
            <option value="galicia">Banco Galicia</option>
            <option value="bbva">BBVA</option>
            <option value="macro">Banco Macro</option>
            <option value="nacion">Banco Nación</option>
            <option value="provincia">Banco Provincia</option>
            <option value="ciudad">Banco Ciudad</option>
            <option value="otro">Otro banco</option>
          </select>
          {errors.bank && (
            <div className="mt-2 flex items-start gap-2 text-red-500">
              <AlertTriangle className="w-3 h-3 mt-0.5" />
              <p className="text-xs">{errors.bank}</p>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center mb-2">
            <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
            <label className="text-xs font-light text-gray-700">Número de tarjeta</label>
          </div>

          <input
            type="text"
            value={cardInfo.number}
            onChange={(e) => onCardInfoChange('number', formatCardNumber(e.target.value))}
            placeholder="•••• •••• •••• ••••"
            maxLength={19}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            autoComplete="cc-number"
            inputMode="numeric"
          />
          {errors.number && (
            <div className="mt-2 flex items-start gap-2 text-red-500">
              <AlertTriangle className="w-3 h-3 mt-0.5" />
              <p className="text-xs">{errors.number}</p>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center mb-2">
            <User className="w-4 h-4 mr-2 text-blue-600" />
            <label className="text-xs font-light text-gray-700">Nombre del titular</label>
          </div>

          <input
            type="text"
            value={cardInfo.name}
            onChange={(e) => onCardInfoChange('name', e.target.value.toUpperCase())}
            placeholder="NOMBRE COMO FIGURA EN LA TARJETA"
            className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all uppercase"
            autoComplete="cc-name"
          />
          {errors.name && (
            <div className="mt-2 flex items-start gap-2 text-red-500">
              <AlertTriangle className="w-3 h-3 mt-0.5" />
              <p className="text-xs">{errors.name}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center mb-2">
              <Calendar className="w-4 h-4 mr-2 text-blue-600" />
              <label className="text-xs font-light text-gray-700">Vencimiento</label>
            </div>

            <input
              type="text"
              value={cardInfo.expiry}
              onChange={(e) => onCardInfoChange('expiry', formatExpiry(e.target.value))}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              autoComplete="cc-exp"
              inputMode="numeric"
            />
            {errors.expiry && (
              <div className="mt-2 flex items-start gap-2 text-red-500">
                <AlertTriangle className="w-3 h-3 mt-0.5" />
                <p className="text-xs">{errors.expiry}</p>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center mb-2">
              <Lock className="w-4 h-4 mr-2 text-blue-600" />
              <label className="text-xs font-light text-gray-700">CVV</label>
            </div>

            <input
              type="text"
              value={cardInfo.cvv}
              onChange={(e) => {
                onCardInfoChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4));
                setIsFlipped(true);
              }}
              onFocus={() => setIsFlipped(true)}
              onBlur={() => setIsFlipped(false)}
              placeholder="•••"
              maxLength={4}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              autoComplete="cc-csc"
              inputMode="numeric"
            />
            {errors.cvv && (
              <div className="mt-2 flex items-start gap-2 text-red-500">
                <AlertTriangle className="w-3 h-3 mt-0.5" />
                <p className="text-xs">{errors.cvv}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={onBack}
          className="w-1/3 py-3.5 bg-gray-50 hover:bg-gray-100 text-gray-800 text-sm font-light tracking-wide rounded-xl transition-all flex items-center justify-center group"
        >
          Volver
        </button>
        
        <button 
          onClick={handleNext}
          className="w-2/3 py-3.5 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-light tracking-wide rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center group"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};