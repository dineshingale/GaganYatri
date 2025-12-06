import React from 'react';

const Slide = ({ imageUrl, title, subtitle }) => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center flex-shrink-0 bg-black">
      
      <div className="absolute inset-0 z-[1]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-[10] w-full h-full flex flex-col items-center justify-center text-center text-white">
        <div className="mt-[50px]">
          <h2 className="text-6xl md:text-8xl font-bold uppercase leading-none m-0 opacity-0 animate-fade-in-up">
            {title}
          </h2>
          
          <p className="text-sm md:text-lg font-normal uppercase mt-4 tracking-[0.5px] px-5 opacity-0 animate-fade-in-up [animation-delay:0.3s]">
            {subtitle}
          </p>

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