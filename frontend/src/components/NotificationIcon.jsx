import React, { useState, useEffect } from 'react';
import notificationImg from '../assets/notification.png';

const NotificationIcon = ({ onClick, className = "", hasNewNotification = false, count = 0 }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger animation when hasNewNotification changes to true
  useEffect(() => {
    if (hasNewNotification) {
      setIsAnimating(true);
      // Stop animation after animation duration
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 600); // Animation duration matches CSS animation

      return () => clearTimeout(timer);
    }
  }, [hasNewNotification]);

  return (
    <div 
      className={`relative cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Notification icon with same height as button */}
      <div 
        className={`h-[48px] w-[48px] rounded-full flex items-center justify-center transition-colors ${
          hasNewNotification 
            ? 'bg-yellow hover:bg-yellow-darker' 
            : 'bg-orange hover:bg-orange-darker'
        } ${
          isAnimating ? 'animate-pulse-scale' : ''
        }`}
      >
        <img src={notificationImg} alt="Notifications" className="h-6 w-6 object-contain" />
      </div>
      
      {/* Notification count badge */}
      {count > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
          {count > 9 ? '9+' : count}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
