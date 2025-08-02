import React from 'react';

const Button = ({ children, onClick, className = "", ...props }) => {
  return (
    <button 
      className={`px-6 py-3 bg-orange hover:bg-orange-darker text-black font-bold rounded-lg transition-colors ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
