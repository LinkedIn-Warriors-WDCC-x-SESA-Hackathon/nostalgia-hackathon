import React from 'react';

const Lunchbox = ({ 
  primaryColor = 'bg-purple-300', 
  tilt = 0,
  size = 'medium',
  className = ''
}) => {
  // Size configurations
  const sizeConfig = {
    small: {
      container: 'w-[40rem] h-[20rem]',
      padding: 'p-6'
    },
    medium: {
      container: 'w-[64rem] h-[32rem]',
      padding: 'p-8'
    },
    large: {
      container: 'w-[80rem] h-[40rem]',
      padding: 'p-10'
    }
  };

  const config = sizeConfig[size];
  
  // Generate transform style for tilt
  const transformStyle = tilt !== 0 ? { transform: `rotate(${tilt}deg)` } : {};

  return (
    <div 
      className={`${primaryColor} ${config.container} ${config.padding} rounded-2xl shadow-lg ${className}`}
      style={transformStyle}
    >
      {/* Just a solid colored box - no internal grid */}
    </div>
  );
};

export default Lunchbox;