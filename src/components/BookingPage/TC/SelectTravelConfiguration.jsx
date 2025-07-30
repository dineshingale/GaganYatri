import React from "react";
import Adventures from "../Adventures/Adventures";
import Spacecrafts from "../Spacecrafts/Spacecrafts";
import Launchsites from "../Launchsites/Launchsites";
import TravelConfiguration from "../TravelConfiguration/TravelConfiguration";
import Passengers from "../Passengers/Passengers";
import BookingConfirmation from "../BookingCofirmation/BookingCofirmation"; 
import styles from "./SelectTravelConfiguration.module.css";

const SelectTravelConfiguration = ({ step, selectedOptions, onOptionSelect, onNext, passengers, setPassengers }) => {
  return (
    <section className={styles["select-option"]}>
      {step === 1 && (
        <Adventures   
          onSelect={(option) => onOptionSelect('adventure', option)}
          selectedId={selectedOptions.adventure?.id}
        />
      )}
      {step === 2 && (
        <Spacecrafts 
          onSelect={(option) => onOptionSelect('spacecraft', option)}
          selectedId={selectedOptions.spacecraft?.id}
        />
      )}
      {step === 3 && (
        <Launchsites 
          onSelect={(option) => onOptionSelect('launchsite', option)}
          selectedId={selectedOptions.launchsite?.id}
        />
      )}
      {step === 4 && <TravelConfiguration options={selectedOptions} />}
      {step === 5 && <Passengers onNext={onNext} passengers={passengers} setPassengers={setPassengers}/>}
      {step === 6 && <BookingConfirmation selectedOptions={selectedOptions} passengers={passengers} />}
    </section>
  );
};

export default SelectTravelConfiguration;