import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  currentStep, 
  totalSteps 
}) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="relative h-1 w-full">
      <div className="absolute top-0 left-0 h-full w-full bg-gray-200"></div>
      <div 
        className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};