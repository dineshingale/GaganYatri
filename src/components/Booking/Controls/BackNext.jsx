import React from "react";
import { ChevronLeft, Loader2 } from "lucide-react";

const BackNext = ({ onBack, onNext, currentStep, selectedOptions, passengers, isSubmitting = false }) => {
  const ArrowIcon = () => (
    <svg className="icon ml-4 w-[14px] h-[14px] fill-white transition-transform duration-300 ease-in-out group-hover:fill-black group-hover:-translate-y-0.5" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9893 5.58371L12.2471 5.89914L11.9893 6.21555L8.10059 10.9782L7.3252 10.3454L10.5479 6.39914L1.39941 6.39914L1.39941 5.39914L10.5479 5.39914L7.3252 1.45383L8.10059 0.821014L11.9893 5.58371Z" />
    </svg>
  );

  const isOptionSelected = () => {

    if (currentStep <= 3) {
      return (
        selectedOptions?.adventure &&
        selectedOptions?.spacecraft &&
        selectedOptions?.launchsite
      );
    }
    return true;
  };

  const handleNextClick = () => {
    if (!isOptionSelected() && currentStep <= 3) {
      alert("Please select an option before proceeding");
      return;
    }
    onNext();
  };

  const handleBackClick = () => {
    // First go back to step 3
    onBack();

    // If on preview (step 4), scroll to launchsite slider after going back
    if (currentStep === 4) {
      setTimeout(() => {
        const launchsiteElement = document.getElementById('slider-launchsite');
        if (launchsiteElement) {
          launchsiteElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const showBackButton = currentStep > 1;
  const showNextButton = currentStep < 6;

  return (
    <section className="w-full bg-black border-t border-white/20 py-6 px-5 md:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto flex gap-4 justify-between">
        {showBackButton ? (
          <button
            onClick={() => { if (!isSubmitting) handleBackClick(); }}
            disabled={isSubmitting}
            className={`group relative inline-flex items-center justify-center py-4 px-8 text-white uppercase text-sm font-semibold tracking-wider border-2 border-white overflow-hidden transition-colors duration-300 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:text-black cursor-pointer'}`}
          >
            <span className="relative z-10 flex items-center"><ChevronLeft size={14} className="mr-2" /> Back</span>
            <div className="absolute inset-0 bg-white transform scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></div>
          </button>
        ) : (
          <div />
        )}

        {showNextButton ? (
          isSubmitting ? (
            <button
              className="group relative inline-flex items-center justify-center py-4 px-8 text-white uppercase text-sm font-semibold tracking-wider border-2 border-white overflow-hidden transition-colors duration-300 ease-in-out opacity-50 cursor-not-allowed"
              disabled
            >
              <span className="relative z-10">Submitting <Loader2 className="inline-block animate-spin ml-2" size={14} /></span>
            </button>
          ) : (
            <button
              onClick={handleNextClick}
              className="group relative inline-flex items-center justify-center py-4 px-8 text-white uppercase text-sm font-semibold tracking-wider border-2 border-white overflow-hidden transition-colors duration-300 ease-in-out hover:text-black cursor-pointer"
            >
              <span className="relative z-10">Next</span>
              <ArrowIcon />
              <div className="absolute inset-0 bg-white transform scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></div>
            </button>
          )
        ) : (
          <button
            className="group relative inline-flex items-center justify-center py-4 px-8 text-white uppercase text-sm font-semibold tracking-wider border-2 border-green-500 overflow-hidden transition-colors duration-300 ease-in-out hover:text-black cursor-not-allowed"
          >
            <span className="relative z-10">✓ Booking Complete</span>
            <div className="absolute inset-0 bg-green-500 transform scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></div>
          </button>
        )}
      </div>
    </section>
  );
};

export default BackNext;
