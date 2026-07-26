import React, { useEffect, useState } from 'react';
import { MessageSquare, X, AlertTriangle, Info } from 'lucide-react';

export default function Toast({ message, title = 'Nova Interação', type = 'info', onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(onClose, 300);
    }, 8000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const icons = {
    warning: <AlertTriangle size={20} />,
    info: <MessageSquare size={20} />
  };

  const colors = {
    warning: 'bg-yellow-50 text-yellow-600 border-yellow-100',
    info: 'bg-blue-50 text-blue-500 border-blue-100'
  };

  return (
    <div className={`bg-white shadow-xl shadow-gray-200/50 rounded-2xl p-4 flex items-start gap-4 border border-gray-100 transition-all duration-300 w-80 
      ${isClosing ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}
    `}>
      <div className={`${colors[type] || colors.info} p-2 rounded-full shrink-0 border`}>
        {icons[type] || icons.info}
      </div>
      <div className="flex-1 pr-2">
        <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
        <p className="text-xs text-gray-500 mt-0.5 leading-snug">{message}</p>
      </div>
      <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors shrink-0 p-1">
        <X size={14} />
      </button>
    </div>
  );
}
