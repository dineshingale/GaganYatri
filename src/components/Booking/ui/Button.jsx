import React from 'react';

const Button = ({ children, href, variant = 'primary' }) => {
  // Base classes that apply to all buttons
  const baseClasses =
    'px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 ease-in-out transform hover:scale-105';

  // Variant-specific classes
  const variantClasses = {
    primary: 'bg-white text-black border-2 border-transparent hover:bg-transparent hover:text-white hover:border-white',
    secondary: 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-black',
  };

  return (
    <a href={href} className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </a>
  );
};

export default Button;