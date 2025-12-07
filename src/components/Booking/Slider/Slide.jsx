import React from 'react';

const Slide = ({ imageUrl, title, subtitle, onSelect, slideData }) => {

  const ArrowIcon = () => (
    <svg className="icon ml-4 w-[14px] h-[14px] fill-white transition-transform duration-300 ease-in-out group-hover:fill-black group-hover:-translate-y-0.5" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9893 5.58371L12.2471 5.89914L11.9893 6.21555L8.10059 10.9782L7.3252 10.3454L10.5479 6.39914L1.39941 6.39914L1.39941 5.39914L10.5479 5.39914L7.3252 1.45383L8.10059 0.821014L11.9893 5.58371Z"/>
    </svg>
  );

  const handleSelectClick = (e) => {
    e.preventDefault();
    if (onSelect) {
      onSelect(slideData || { imageUrl, title, subtitle });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center flex-shrink-0 bg-black">
      
      <div className="absolute inset-0 z-[1]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-[10] w-full h-full flex flex-col items-center justify-center text-center text-white">
        <div className="mt-[50px] flex flex-col items-center gap-6">
          <h2 className="text-6xl md:text-8xl font-bold uppercase leading-none m-0 opacity-0 animate-fade-in-up">
            {title}
          </h2>

          <p className="text-sm md:text-lg font-normal uppercase tracking-[0.5px] px-5 opacity-0 animate-fade-in-up [animation-delay:0.3s]">
            {subtitle}
          </p>

          <button 
            onClick={handleSelectClick}
            className="group relative inline-flex items-center justify-center py-4 px-8 text-white uppercase text-sm font-semibold tracking-wider border-2 border-white overflow-hidden transition-colors duration-300 ease-in-out hover:text-black cursor-pointer"
          >
            <span className="relative z-10">Select</span>
            <ArrowIcon /> 
            <div className="absolute inset-0 bg-white transform scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></div>
          </button>
        </div>
        
        <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 opacity-80 animate-bounce [animation-duration:2s]">
            <svg width="30" height="20" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
        </div>
      </div>
    </section>
  );
};

export default Slide;