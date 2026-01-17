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
    <div className="w-full bg-transparent p-6 flex justify-center">
      <nav aria-label="Progress" className="w-fit max-w-full overflow-x-auto no-scrollbar">
        <ol
          className="flex items-center bg-transparent"
        >
          {steps.map((step, stepIdx) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <li
                key={step.id}
                className="relative flex items-center flex-none"
              >

                <div className={`
                  group flex items-center justify-center px-4 py-3 text-sm font-medium transition-colors duration-300
                  ${isCurrent ? 'text-white' : 'text-white/60 hover:text-white'}
                `}>
                  {/* Circle Indicator */}
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

                  {/* Text Label - UPDATED HERE */}
                  <div className={`
                    grid transition-all duration-500 ease-in-out
                    grid-cols-[0fr] opacity-0 ml-0
                    ${isCurrent ? 'md:grid-cols-[1fr] md:opacity-100 md:ml-3' : ''}
                    
                    {/* CHANGED: lg: to min-[1350px]: */}
                    min-[1350px]:grid-cols-[1fr] min-[1350px]:opacity-100 min-[1350px]:ml-3
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