import { motion } from 'framer-motion';
import { FileText, User, CreditCard } from 'lucide-react';

interface LoadingSpinnerProps {
  type: 'document' | 'identity' | 'credit';
  message: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ type, message }) => {
  const icons = {
    document: <FileText className="w-12 h-12 text-blue-600" />,
    identity: <User className="w-12 h-12 text-blue-600" />,
    credit: <CreditCard className="w-12 h-12 text-blue-600" />
  };

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        {icons[type]}
      </motion.div>
      
      <motion.div
        className="w-8 h-8 border-2 border-blue-600 rounded-full border-t-transparent mb-4"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      
      <p className="text-sm text-gray-600 font-light">{message}</p>
    </div>
  );
};