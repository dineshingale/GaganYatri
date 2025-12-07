import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BackNext = ({ onBack, onNext, currentStep, selectedOptions, passengers }) => {
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

  
  const showBackButton = currentStep > 1;
  const showNextButton = currentStep < 6;

  return (
    <section className="w-full bg-black border-t border-white/20 py-6 px-5 md:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto flex gap-4 justify-between">
        {showBackButton ? (
          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-white/10 border border-white/30 text-white px-8 py-3 rounded-lg font-bold hover:bg-white/20 transition"
          >
            <ChevronLeft size={20} /> Back
          </button>
        ) : (
          <div />
        )}

        {showNextButton ? (
          <button
            onClick={handleNextClick}
            className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition"
          >
            Next <ChevronRight size={20} />
          </button>
        ) : (
          <button
            className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition cursor-not-allowed"
          >
            ✓ Booking Complete
          </button>
        )}
      </div>
    </section>
  );
};

export default BackNext;
