import React from 'react';
import logo from '../../../assets/logo.svg'; 
import ProgressLine from '../ProgressLine/ProgressLine';

const Navbar = ({ currentStep = 1 }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-gradient-to-b from-black/80 to-transparent transition-colors duration-300 p-5 min-[1350px]:py-[30px] min-[1350px]:px-[50px] overflow-x-hidden">
      
      {/* FIRST ROW - always visible: logo (left) and My Account (right).
          Keep these in a nowrap container so they never drop to a second row.
      */}
      <div className="w-full flex items-center justify-between flex-nowrap">
        <div className="flex-none w-[150px] min-[1350px]:w-[210px] flex items-center cursor-pointer">
          <img src={logo} alt="GaganYatri Logo" className="w-full h-auto block" />
        </div>

        {/* ProgressLine for large screens: centered in the same row when md+ */}
        <div className="hidden md:flex md:flex-1 md:justify-center md:order-none">
          <div className="max-w-[900px] w-full px-4 overflow-hidden">
            <ProgressLine currentStep={currentStep} />
          </div>
        </div>

        <div className="flex-none flex items-center">
          <a 
            href="#" 
            className="flex items-center bg-transparent border border-white/40 py-2 px-4 rounded text-white uppercase text-xs font-bold tracking-[1px] no-underline transition-colors duration-300 whitespace-nowrap hover:border-white"
          >
            My Account
          </a>
        </div>
      </div>

      {/* SECOND ROW - progress line for small screens (below the first row).
          Visible only on small screens and sits very close to the first row using negative margin.
      */}
      <div className="w-full md:hidden flex justify-center -mt-3 overflow-hidden">
        <div className="w-full px-4">
          <ProgressLine currentStep={currentStep} />
        </div>
      </div>

    </nav>
  );
};

export default Navbar;