import React, { useRef } from 'react';
import SelectionSlider from '../SelectionSlider/SelectionSlider';
import TravelPreview from '../TravelPreview/TravelPreview';
import Passengers from '../Passengers/Passengers';
import BookingConfirmation from '../BookingConfirmation/BookingConfirmation';

const SelectionContainer = ({
  step,
  selectedOptions,
  passengers,
  setPassengers,
  onOptionSelect,
  onNext,
  onAllSelected,
  adventureSlides,
  spacecraftSlides,
  launchsiteSlides
}) => {
  const refs = [useRef(null), useRef(null), useRef(null)];

  const sliderConfigs = [
    { key: 'adventure', slides: adventureSlides },
    { key: 'spacecraft', slides: spacecraftSlides },
    { key: 'launchsite', slides: launchsiteSlides }
  ];

  const handleStackSelect = (index, option) => {
    const type = sliderConfigs[index].key;

    onOptionSelect(type, option);

    const nextIndex = (index + 1) % refs.length;
    
    setTimeout(() => {
      refs[nextIndex].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);


    const newSelected = {
      ...selectedOptions,
      [type]: option
    };

    if (newSelected.adventure && newSelected.spacecraft && newSelected.launchsite) {

      onAllSelected && onAllSelected();
    }
  };

  if (step <= 3) {
    return (
      <div className="w-full bg-black">
        {sliderConfigs.map((cfg, i) => (
          <section
            key={cfg.key}
            ref={refs[i]}
            className="w-full min-h-screen border-b border-white/10"
          >
            <SelectionSlider
                slides={cfg.slides}
                onSelect={(option) => handleStackSelect(i, option)}
                selectedId={selectedOptions[cfg.key]?.id}
            />
          </section>
        ))}
      </div>
    );
  }

  return (
    <>
      {step === 4 && (
        <TravelPreview selectedOptions={selectedOptions} />
      )}
      {step === 5 && (
        <Passengers
          onNext={onNext}
          passengers={passengers}
          setPassengers={setPassengers}
        />
      )}
      {step === 6 && (
        <BookingConfirmation
          selectedOptions={selectedOptions}
          passengers={passengers}
        />
      )}
    </>
  );
};

export default SelectionContainer;
