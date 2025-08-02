import React from 'react';
import notificationImg from '../assets/notification.png';

const NotificationIcon = ({ onClick, className = "" }) => {
  return (
    <div 
      className={`relative cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Notification icon with same height as button */}
      <div className="h-[48px] w-[48px] bg-orange hover:bg-orange-darker rounded-full flex items-center justify-center transition-colors">
        <img src={notificationImg} alt="Notifications" className="h-6 w-6 object-contain" />
      </div>
    </div>
  );
};

export default NotificationIcon;
