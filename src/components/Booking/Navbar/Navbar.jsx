import React from 'react';
import logo from '../../../assets/logo.svg'; 
import ProgressLine from '../ProgressLine/ProgressLine';

const Navbar = ({ currentStep = 1 }) => {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center z-[100] bg-gradient-to-b from-black/80 to-transparent transition-colors duration-300 p-5 xl:py-[30px] xl:px-[50px]">
      <div className="w-[150px] xl:w-[210px] flex items-center cursor-pointer">
        <img src={logo} alt="GaganYatri Logo" className="w-full h-auto block" />
      </div>

      <ProgressLine currentStep={currentStep} />

      <div className="hidden md:flex items-center">
        <a 
          href="#" 
          className="flex items-center bg-transparent border border-white/40 py-2 px-4 rounded text-white uppercase text-xs font-bold tracking-[1px] no-underline transition-colors duration-300 whitespace-nowrap hover:border-white"
        >
          My Account
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
