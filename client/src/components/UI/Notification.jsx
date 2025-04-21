import React, { useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type = 'success', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  return (
    <div className={`notification notification-${type}`}>
      <span className="material-icons">
        {type === 'success' ? 'check_circle' : 
         type === 'error' ? 'error' :
         type === 'info' ? 'info' : 'check_circle'}
      </span>
      <p>{message}</p>
    </div>
  );
};

export default Notification; 