import React from 'react';

const NavArrow = ({ direction, onClick }) => {
  const isLeft = direction === 'left';

  // Common classes for both arrows, translating the original CSS
  const baseClasses =
    'absolute top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer z-30 p-2.5 md:p-5 opacity-70 transition-all duration-300 ease-in-out hover:opacity-100 hover:scale-110';

  // Specific classes for positioning based on the direction prop
  const positionClasses = isLeft ? 'left-2.5 md:left-[30px]' : 'right-2.5 md:right-[30px]';

  return (
    <button className={`${baseClasses} ${positionClasses}`} onClick={onClick}>
      {isLeft ? (
        <svg width="30" height="50" viewBox="0 0 20 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 5 L5 15 L15 25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="30" height="50" viewBox="0 0 20 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 5 L15 15 L5 25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
};

export default NavArrow;