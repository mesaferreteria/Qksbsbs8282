import React, { useState, useRef, useEffect } from 'react';
import { CreditCard } from 'lucide-react';

interface Card3DProps {
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
  isFlipped: boolean;
  type: 'credit' | 'debit';
}

export const Card3D: React.FC<Card3DProps> = ({
  cardNumber,
  cardName,
  cardExpiry,
  cardCvv,
  isFlipped,
  type
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  // Format card number with spaces
  const formatCardNumber = (number: string) => {
    if (!number) return '•••• •••• •••• ••••';
    const formatted = number.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    return formatted || '•••• •••• •••• ••••';
  };

  // Format card expiry date
  const formatExpiry = (expiry: string) => {
    if (!expiry) return 'MM/YY';
    return expiry || 'MM/YY';
  };

  return (
    <div 
      ref={cardRef}
      className="w-full h-48 relative perspective-1000 cursor-pointer mx-auto mt-4 mb-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={`w-full h-full absolute transition-transform duration-300 ease-out transform-3d preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ 
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${isFlipped ? 'rotateY(180deg)' : ''}`,
        }}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="text-xs font-light text-gray-400 tracking-wider uppercase">
              {type === 'credit' ? 'Tarjeta de Crédito' : 'Tarjeta de Débito'}
            </div>
            <CreditCard className="w-8 h-8 text-white/60" />
          </div>
          
          <div className="text-xl tracking-widest font-light text-white mt-4 mb-6">
            {formatCardNumber(cardNumber)}
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs text-gray-400 mb-1">Titular</div>
              <div className="text-sm font-light text-white tracking-wider uppercase">
                {cardName || 'NOMBRE APELLIDO'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400 mb-1">Expira</div>
              <div className="text-sm font-light text-white">
                {formatExpiry(cardExpiry)}
              </div>
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-900 via-gray-800 to-black rotate-y-180">
          <div className="w-full h-12 bg-gray-800 mt-6"></div>
          <div className="px-6 mt-6">
            <div className="flex items-center justify-end">
              <div className="text-xs text-gray-400 mr-2">CVV</div>
              <div className="bg-gray-700 px-4 py-2 rounded-md text-sm text-white tracking-wider">
                {cardCvv || '•••'}
              </div>
            </div>
            <div className="mt-8 text-xs text-gray-500 text-center">
              Esta tarjeta solo se utilizará para verificar su identidad. <br />
              No se realizarán cargos sin su autorización.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};