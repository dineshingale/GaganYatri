import React from 'react';
import logo from '../../../assets/logo.svg'; 

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center z-[100] bg-gradient-to-b from-black/80 to-transparent transition-colors duration-300 p-5 xl:py-[30px] xl:px-[50px]">
      <div className="w-[150px] xl:w-[210px] flex items-center cursor-pointer">
        <img src={logo} alt="GaganYatri Logo" className="w-full h-auto block" />
      </div>

      <ul className="hidden xl:flex gap-[25px] list-none">
        <li>
          <a href="#" className="text-white no-underline uppercase text-sm font-bold tracking-[1px] transition-colors duration-200 ease-linear whitespace-nowrap hover:text-gray-300 hover:underline hover:underline-offset-4">
            Adventures
          </a>
        </li>
        <li>
          <a href="#" className="text-white no-underline uppercase text-sm font-bold tracking-[1px] transition-colors duration-200 ease-linear whitespace-nowrap hover:text-gray-300 hover:underline hover:underline-offset-4">
            Spacecrafts
          </a>
        </li>
        <li>
          <a href="#" className="text-white no-underline uppercase text-sm font-bold tracking-[1px] transition-colors duration-200 ease-linear whitespace-nowrap hover:text-gray-300 hover:underline hover:underline-offset-4">
            Launchsites
          </a>
        </li>
      </ul>

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
