import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = (e) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      // Already on homepage, just scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      // Not on homepage, navigate first
      navigate('/');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="w-full bg-black text-gray-400 text-sm text-center py-6">
      <div className="flex justify-center gap-6">
        <a href="mailto:gaganyatriii@gmail.com" className="hover:text-white transition-colors duration-300">Email</a>
        <a href="tel:+918999577533" className="hover:text-white transition-colors duration-300">Phone</a>
        <a href="https://maps.app.goo.gl/LBtX6cYfVk4cjfHN9" className="hover:text-white transition-colors duration-300">Adddress</a>
        <a href="/" onClick={handleHomeClick} className="hover:text-white transition-colors duration-300">Home</a>
        <a href="/book" className="hover:text-white transition-colors duration-300">Book</a>
      </div>
      <p className="mt-4">&copy; 2025 Emanx. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;