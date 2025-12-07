import React from 'react';

const Button = ({
  children,
  href,
  onClick,
  variant = 'primary',
  showArrow = true,
  className = '',
  target,
  rel,
  type = 'button', // Default for <button> elements
}) => {
  // 1. Logic to determine if we render an <a> or a <button>
  const Component = href ? 'a' : 'button';

  // 2. Security: Auto-add rel="noopener noreferrer" for external links
  const safeRel = target === '_blank' && !rel ? 'noopener noreferrer' : rel;

  const baseClasses =
    // Note: Used 'transition-all' to ensure both color AND transform animate smoothly
    'group inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variantClasses = {
    primary:
      'bg-white text-black border-2 border-transparent hover:bg-transparent hover:text-white hover:border-white focus-visible:ring-white',
    secondary:
      'bg-transparent text-white border-2 border-white hover:bg-white hover:text-black focus-visible:ring-white',
  };

  return (
    <Component
      href={href}
      onClick={onClick}
      type={!href ? type : undefined} // Only apply 'type' to buttons
      target={target}
      rel={safeRel}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <span>{children}</span>

      {showArrow && (
        <svg
          // h-[1em] w-[1em] ensures perfect scaling with text size
          className="h-[1em] w-[1em] text-current stroke-current transition-transform duration-300 group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Component>
  );
};

export default Button;
