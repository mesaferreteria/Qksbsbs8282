import React, { useState } from 'react';
import { ChevronRight, DollarSign, Calendar, Info, BarChart2, PieChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoanAmountStepProps {
  loanAmount: number;
  loanTerm: number;
  onLoanAmountChange: (amount: number) => void;
  onLoanTermChange: (term: number) => void;
  onNext: () => void;
}

export const LoanAmountStep: React.FC<LoanAmountStepProps> = ({
  loanAmount,
  loanTerm,
  onLoanAmountChange,
  onLoanTermChange,
  onNext
}) => {
  const [showPaymentSchedule, setShowPaymentSchedule] = useState(false);
  const [showPieChart, setShowPieChart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Calculate monthly payment (simple calculation)
  const interestRate = 0.039; // 3.9% monthly interest
  const monthlyPayment = (loanAmount * (interestRate * Math.pow(1 + interestRate, loanTerm))) / 
                         (Math.pow(1 + interestRate, loanTerm) - 1);
  
  // Calculate total interest
  const totalInterest = (monthlyPayment * loanTerm) - loanAmount;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Generate payment schedule data
  const generatePaymentSchedule = () => {
    let balance = loanAmount;
    const schedule = [];
    
    for (let month = 1; month <= loanTerm; month++) {
      const interest = balance * interestRate;
      const principal = monthlyPayment - interest;
      balance -= principal;
      
      schedule.push({
        month,
        payment: monthlyPayment,
        principal,
        interest,
        balance: Math.max(0, balance)
      });
    }
    
    return schedule;
  };

  const handleNext = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
    onNext();
  };

  return (
    <div className="animate-fade-in py-2">
      <h2 className="text-lg font-light text-center tracking-wide text-gray-800 mb-8">
        Personalice su préstamo
      </h2>
      
      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-sm mb-8">
        <div className="space-y-8">
          {/* Loan Amount Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">Monto del préstamo</label>
              <span className="text-xl font-semibold text-blue-600">
                {formatCurrency(loanAmount)}
              </span>
            </div>
            <div className="relative mt-4">
              <input
                type="range"
                min="50000"
                max="2500000"
                step="10000"
                value={loanAmount}
                onChange={(e) => onLoanAmountChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">$50.000</span>
                <span className="text-xs text-gray-500">$2.500.000</span>
              </div>
            </div>
          </div>

          {/* Loan Term Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">Plazo del préstamo</label>
              <span className="text-xl font-semibold text-blue-600">
                {loanTerm} meses
              </span>
            </div>
            <div className="relative mt-4">
              <input
                type="range"
                min="3"
                max="60"
                step="3"
                value={loanTerm}
                onChange={(e) => onLoanTermChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">3 meses</span>
                <span className="text-xs text-gray-500">60 meses</span>
              </div>
            </div>
          </div>

          {/* Monthly Payment Display */}
          <div className="pt-4 border-t border-gray-100">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Cuota mensual estimada</div>
              <div className="text-3xl font-semibold text-gray-900">{formatCurrency(monthlyPayment)}</div>
              <div className="text-sm text-gray-500 mt-1">TNA 46.8% • TEA 58.3% • CFT 63.7%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Details */}
      <div className="bg-blue-50/50 backdrop-blur-sm rounded-xl p-6 mb-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-500 mb-1">Total a pagar</div>
            <div className="text-lg font-medium text-gray-900">
              {formatCurrency(monthlyPayment * loanTerm)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Total intereses</div>
            <div className="text-lg font-medium text-gray-900">
              {formatCurrency(totalInterest)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Costo financiero total</div>
            <div className="text-lg font-medium text-gray-900">63.7% anual</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Relación cuota/préstamo</div>
            <div className="text-lg font-medium text-gray-900">
              {((monthlyPayment / loanAmount) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Chart Toggles */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            setShowPaymentSchedule(!showPaymentSchedule);
            setShowPieChart(false);
          }}
          className="flex-1 py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm text-gray-700 flex items-center justify-center gap-2 transition-colors"
        >
          <BarChart2 className="w-4 h-4" />
          {showPaymentSchedule ? 'Ocultar amortización' : 'Ver amortización'}
        </button>
        
        <button
          onClick={() => {
            setShowPieChart(!showPieChart);
            setShowPaymentSchedule(false);
          }}
          className="flex-1 py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm text-gray-700 flex items-center justify-center gap-2 transition-colors"
        >
          <PieChart className="w-4 h-4" />
          {showPieChart ? 'Ocultar distribución' : 'Ver distribución'}
        </button>
      </div>
      
      {/* Payment Schedule Table */}
      <AnimatePresence>
        {showPaymentSchedule && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500">Cuota</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">Pago mensual</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">Capital</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">Interés</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatePaymentSchedule().map((payment, index) => (
                      <tr key={index} className="border-t border-gray-100">
                        <td className="py-3 px-4 text-left text-xs text-gray-800">{payment.month}</td>
                        <td className="py-3 px-4 text-right text-xs text-gray-800">{formatCurrency(payment.payment)}</td>
                        <td className="py-3 px-4 text-right text-xs text-gray-800">{formatCurrency(payment.principal)}</td>
                        <td className="py-3 px-4 text-right text-xs text-gray-800">{formatCurrency(payment.interest)}</td>
                        <td className="py-3 px-4 text-right text-xs text-gray-800">{formatCurrency(payment.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {showPieChart && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 p-6">
              <h3 className="text-sm font-medium text-gray-800 mb-4">Distribución del préstamo</h3>
              <div className="flex items-center gap-8">
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {/* Capital */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="10"
                      strokeDasharray={`${(loanAmount / (loanAmount + totalInterest)) * 283} 283`}
                    />
                  </svg>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-gray-600">Capital</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-800">
                        {formatCurrency(loanAmount)}
                      </span>
                      <span className="text-sm text-gray-600">
                        {((loanAmount / (loanAmount + totalInterest)) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                      <span className="text-sm text-gray-600">Intereses</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-800">
                        {formatCurrency(totalInterest)}
                      </span>
                      <span className="text-sm text-gray-600">
                        {((totalInterest / (loanAmount + totalInterest)) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={handleNext}
        disabled={isLoading}
        className="primary-button w-full relative overflow-hidden"
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
  );
};