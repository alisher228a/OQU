import { FC, useEffect, useState } from 'react';

interface NotificationProps {
  type?: 'success' | 'error' | 'warning' | 'info'; 
  message: string; 
  onClose: () => void; 
}

const Notification: FC<NotificationProps> = ({ type = 'success', message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const colors: Record<string, string> = {
    success: 'bg-green-100 text-green-800 border-green-500',
    error: 'bg-red-100 text-red-800 border-red-500',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-500',
    info: 'bg-blue-100 text-blue-800 border-blue-500',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-50 z-50 w-full max-w-sm border-l-4 rounded-lg shadow-lg p-4 flex items-center justify-between transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100 transform translate-y-0 animate-fade-in-down' : 'opacity-0 transform translate-y-10 animate-fade-out'
      } ${colors[type]}`}
    >
      <span className="flex-1">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300); 
        }}
        className="ml-4 text-lg font-bold leading-none focus:outline-none hover:text-gray-600"
      >
        &times;
      </button>
    </div>
  );
};

export default Notification;
