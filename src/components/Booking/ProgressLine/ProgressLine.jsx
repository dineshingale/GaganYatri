import React from 'react';
import { Check } from 'lucide-react';

const ProgressLine = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, label: "Adventure Selection" },
    { id: 2, label: "Spacecraft Selection" },
    { id: 3, label: "Launchsite Selection" },
    { id: 4, label: "Preview and Next" },
    { id: 5, label: "Passengers" },
  ];

  return (
    <div className="w-full bg-transparent p-6 rounded-xl flex justify-center">
      <nav aria-label="Progress" className="w-fit max-w-full overflow-x-auto no-scrollbar">
        <ol 
          role="list" 
          className="flex items-center rounded-md bg-transparent border border-white overflow-hidden divide-x divide-white"
        >
          {steps.map((step, stepIdx) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            
            return (
              <li 
                key={step.id} 
                className="relative flex items-center flex-none"
              >
                {stepIdx !== steps.length - 1 && (
                  <div className="hidden md:block absolute top-0 right-0 h-full w-5 z-10 overflow-hidden pointer-events-none translate-x-[12px]">
                    <div className="h-full w-full -translate-x-1/2 rotate-45 transform origin-top-left border-t border-r border-white bg-transparent" />
                  </div>
                )}

                <div className={`
                  group flex items-center justify-center px-4 py-3 text-sm font-medium transition-colors duration-300
                  ${isCurrent ? 'text-white' : 'text-white/60 hover:bg-white/10'}
                `}>
                  
                  <span className={`
                    flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-300 z-20 relative
                    ${isCompleted 
                      ? 'bg-white border-white text-black' 
                      : isCurrent 
                        ? 'border-white text-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' 
                        : 'border-white/60 text-white/60 group-hover:border-white'
                    }
                  `}>
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </span>

                  <div className={`
                    grid transition-all duration-500 ease-in-out
                    grid-cols-[0fr] opacity-0 ml-0
                    ${isCurrent ? 'md:grid-cols-[1fr] md:opacity-100 md:ml-3' : ''}
                    lg:grid-cols-[1fr] lg:opacity-100 lg:ml-3
                  `}>
                    <span className="overflow-hidden whitespace-nowrap">
                      {step.label}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default ProgressLine;