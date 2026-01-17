import React from 'react';
import videoSource from '../../../assets/Mars_Rotation_Web_HB_d96299f9de.webm';

const HeroSection = ({ onExplore }) => {
  const ArrowIcon = () => (
    <svg className="icon ml-4 w-[14px] h-[14px] fill-white transition-transform duration-300 ease-in-out group-hover:fill-black group-hover:-translate-y-0.5" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9893 5.58371L12.2471 5.89914L11.9893 6.21555L8.10059 10.9782L7.3252 10.3454L10.5479 6.39914L1.39941 6.39914L1.39941 5.39914L10.5479 5.39914L7.3252 1.45383L8.10059 0.821014L11.9893 5.58371Z" />
    </svg>
  );

  return (
    <section className="relative h-screen w-full flex items-end overflow-hidden text-white">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://www.spacex.com/static/images/backgrounds/mars_landing.jpg"
          className="w-full h-full object-cover"
        >
          <source src={videoSource} type="video/webm" />
        </video>

      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-12 pb-[15%]">
        <div className="max-w-[600px] opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-5xl font-bold uppercase leading-tight mb-5 tracking-wide">
            Experience the thrill of Space Adventures
          </h2>
          <p className="text-lg leading-relaxed mb-9">
            Gaganyatri was founded on the belief that a future in which public transport explores the stars is fundamentally more exciting than one in which it does not
          </p>

          <div className="flex flex-row gap-4">
            <a onClick={onExplore} className="cursor-pointer group relative inline-flex items-center justify-center py-4 px-8 text-white uppercase text-sm font-semibold tracking-wider border-2 border-white overflow-hidden transition-colors duration-300 ease-in-out hover:text-black">
              <span className="relative z-10">Explore</span>
              <ArrowIcon />
              <div className="absolute inset-0 bg-white transform scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></div>
            </a>
            <a href="/book" className="group relative inline-flex items-center justify-center py-4 px-8 text-white uppercase text-sm font-semibold tracking-wider border-2 border-white overflow-hidden transition-colors duration-300 ease-in-out hover:text-black">
              <span className="relative z-10">Book</span>
              <ArrowIcon />
              <div className="absolute inset-0 bg-white transform scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;