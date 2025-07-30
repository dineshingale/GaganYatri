import React from "react";
import styles from "./BackNext.module.css";

const BackNext = ({ onBack, onNext, currentStep, selectedOptions }) => {
  const isOptionSelected = () => {
    if (currentStep === 1 && !selectedOptions.adventure) return false;
    if (currentStep === 2 && !selectedOptions.spacecraft) return false;
    if (currentStep === 3 && !selectedOptions.launchsite) return false;
    return true;
  };

  const handleNextClick = () => {
    if (!isOptionSelected() && currentStep <= 3) {
      alert(`Please select an option before proceeding`);
      return;
    }
    onNext();
  };

  return (
    <section className={styles["back-next"]}>
      <button onClick={onBack}>Back</button>
      <button onClick={handleNextClick}>Next</button>
    </section>
  );
};

export default BackNext;