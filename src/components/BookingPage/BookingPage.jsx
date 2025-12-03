import React, { useState } from "react";
import Header from "./Header/Header";
import ProgressLine from "./ProgressLine/ProgressLine";
import SelectTravelConfiguration from "./TC/SelectTravelConfiguration";
import BackNext from "./BackNext/BackNext";
import Footer from "./Footer/Footer";

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({
    adventure: null,
    spacecraft: null,
    launchsite: null
  });
  const [passengers, setPassengers] = useState([
    {
      id: 1,
      name: "",
      phone: "",
      age: "",
      gender: "",
      isLeader: false,
      email: "",
      address: ""
    }
  ]);

  const handleNext = () => {
    // Step 5: Passenger validation
    if (step === 5) {
      const isValid = passengers.every(p => {
        const basicInfo = p.name && p.phone && p.age && p.gender;
        const leaderInfo = !p.isLeader || (p.email && p.address);
        return basicInfo && leaderInfo;
      });

      if (!isValid) {
        alert("Please fill all required fields for each passenger.");
        return;
      }
    }

    const newStep = Math.min(step + 1, 6);
    setStep(newStep);
    setMaxStepReached(prev => Math.max(prev, newStep));
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleOptionSelect = (type, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [type]: option
    }));
    setTimeout(handleNext, 1000);
  };

  return (
    // Main container: black background, flex column, full width, centered
    <div className="bg-black flex flex-col items-center justify-center w-full min-h-screen">
      <Header />
      <ProgressLine currentStep={step} maxStepReached={maxStepReached} />
      <SelectTravelConfiguration 
        step={step}
        selectedOptions={selectedOptions}
        passengers={passengers}
        setPassengers={setPassengers}
        onOptionSelect={handleOptionSelect}
        onNext={handleNext}
      />
      <BackNext 
        onBack={handleBack} 
        onNext={handleNext}
        currentStep={step}
        selectedOptions={selectedOptions}
      />
      <Footer />
    </div>
  );
};

export default BookingPage;