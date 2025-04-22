import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    // Set a timer to start the fade-out animation
    const fadeTimer = setTimeout(() => {
      setVisible(false);
    }, duration - 300); // Start hiding 300ms before removal to allow for animation
    
    // Set a timer to remove the notification from the DOM
    const closeTimer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);
  
  return (
    <div className={`notification notification-${type} ${!visible ? 'notification-exit' : ''}`}>
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