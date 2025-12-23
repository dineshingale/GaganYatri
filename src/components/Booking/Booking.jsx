import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import SelectionContainer from './SelectionContainer/SelectionContainer';
import BackNext from './Controls/BackNext';
import Footer from '../HomePage/Footer/Footer';
import { saveBookingToDatabase } from '../../api/bookingService';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';

// Adventure Images
import adventure1 from '../../assets/Adventure 1.webp';
import adventure2 from '../../assets/Adventure 2.webp';
import adventure3 from '../../assets/Adventure 3.webp';
import adventure4 from '../../assets/Adventure 4.webp';
import adventure5 from '../../assets/Adventure 5.webp';
import adventure6 from '../../assets/Adventure 6.webp';

// Rockets & Spacecraft
import falcon from '../../assets/Spacecraft 1.webp';
import starship from '../../assets/Spacecraft 2.webp';
import gaganyan from '../../assets/Spacecraft 3.webp';

// Launch Sites
import launchsiteChennai from '../../assets/launchsite Chennai.webp';
import launchsiteMonaco from '../../assets/launchsite Monaco.webp';
import launchsiteSF from '../../assets/launchsite SF.webp';
import launchsiteTokyo from '../../assets/launchsite Tokyo.webp';

// Data for our reusable Slider component
const AdventureSlides = [
  {
    imageUrl: adventure1,
    title: 'View from Above',
    subtitle: 'Service to Earth Orbit, Moon, Mars and Beyond'
  },
  {
    imageUrl: adventure2,
    title: 'Space Parks',
    subtitle: 'The Most Powerful Launch Vehicle Ever Developed'
  },
  {
    imageUrl: adventure3,
    title: 'Moon',
    subtitle: 'The Most Powerful Launch Vehicle Ever Developed'
  },
  {
    imageUrl: adventure4,
    title: 'Mars',
    subtitle: 'The Most Powerful Launch Vehicle Ever Developed'
  },
  {
    imageUrl: adventure5,
    title: 'Europa',
    subtitle: 'The Most Powerful Launch Vehicle Ever Developed'
  },
  {
    imageUrl: adventure6,
    title: 'Titan',
    subtitle: 'The Most Powerful Launch Vehicle Ever Developed'
  }
];

const SpacecraftSlides = [
  {
    imageUrl: falcon,
    title: 'Falcon',
    subtitle: 'Precision landings for science and exploration'
  },
  {
    imageUrl: gaganyan,
    title: 'Gaganyaan',
    subtitle: 'Comfortable cabins for deep space journeys'
  },
  {
    imageUrl: starship,
    title: 'Starship',
    subtitle: 'Heavy payload delivery across the solar system'
  }
];

const LaunchsiteSlides = [
  {
    imageUrl: launchsiteChennai,
    title: 'Chennai, India',
    subtitle: 'Rapid Earth transport with orbital hops'
  },
  {
    imageUrl: launchsiteMonaco,
    title: 'Monaco, Europe',
    subtitle: 'Multi-orbit insertion with reusable stages'
  },
  {
    imageUrl: launchsiteSF,
    title: 'San Francisco, USA',
    subtitle: 'Building the logistics chain for colonies'
  },
  {
    imageUrl: launchsiteTokyo,
    title: 'Tokyo, Japan',
    subtitle: 'Building the logistics chain for colonies'
  }
];

function Booking() {
  // STATE MANAGEMENT
  const [step, setStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      isLeader: true,
      email: "",
      address: ""
    }
  ]);

  // NAVIGATION HANDLERS
  const submitBookingToServer = async () => {
    const bookingPayload = {
      adventure: selectedOptions.adventure,
      spacecraft: selectedOptions.spacecraft,
      launchsite: selectedOptions.launchsite,
      passengers,
      createdAt: new Date().toISOString()
    };

    setIsSubmitting(true);
    try {
      const res = await saveBookingToDatabase(bookingPayload);
      setIsSubmitting(false);
      return { success: true, data: res };
    } catch (err) {
      console.error('Booking submit error', err);
      setIsSubmitting(false);
      return { success: false, error: err };
    }
  };

  const handleNext = async () => {
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

    // If moving to final confirmation (step 6), submit booking to server first
    if (step === 5 && newStep === 6) {
      const result = await submitBookingToServer();
      if (!result.success) {
        alert('Booking submission failed. Please try again.');
        return;
      }
    }

    setStep(newStep);
    setMaxStepReached(prev => Math.max(prev, newStep));
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  // SELECTION HANDLERS
  const handleOptionSelect = (type, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [type]: option
    }));
  };

  // Move to preview (step 4) when all selections are complete
  const goToPreview = () => {
    const newStep = 4;
    setStep(newStep);
    setMaxStepReached(prev => Math.max(prev, newStep));
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar currentStep={step} />
      
      <main className="flex-1 w-full">
        <SelectionContainer 
          step={step}
          selectedOptions={selectedOptions}
          passengers={passengers}
          setPassengers={setPassengers}
          onOptionSelect={handleOptionSelect}
          onAllSelected={goToPreview}
          onNext={handleNext}
          adventureSlides={AdventureSlides}
          spacecraftSlides={SpacecraftSlides}
          launchsiteSlides={LaunchsiteSlides}
        />
      </main>

      <BackNext 
        onBack={handleBack} 
        onNext={handleNext}
        currentStep={step}
        selectedOptions={selectedOptions}
        passengers={passengers}
        isSubmitting={isSubmitting}
      />

      {isSubmitting && <LoadingOverlay />}
      
      <Footer />
    </div>
  );
}

export default Booking;