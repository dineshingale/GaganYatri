import React, { useState } from 'react';
import Slide from '../Slider/Slide';
import NavArrow from '../ui/NavArrow';

const SelectionSlider = ({ slides = [], onSelect, selectedId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!slides || slides.length === 0) {
    return null;
  }

  const totalSlides = slides.length;

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleSelect = (slideData) => {
    if (onSelect) {
      onSelect(slideData);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <NavArrow direction="left" onClick={handlePrev} />
      <NavArrow direction="right" onClick={handleNext} />

      <div
        className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.645,0.045,0.355,1)]"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            imageUrl={slide.imageUrl}
            title={slide.title}
            subtitle={slide.subtitle}
            onSelect={handleSelect}
            slideData={{
              id: index + 1,
              title: slide.title,
              imageUrl: slide.imageUrl,
              subtitle: slide.subtitle
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectionSlider;
