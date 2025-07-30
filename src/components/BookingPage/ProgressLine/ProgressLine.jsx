import React from "react";
import styles from "./ProgressLine.module.css";

const ProgressLine = ({ currentStep, maxStepReached }) => {
  return (
    <section className={styles["progress-line"]}>
      {[1, 2, 3, 4, 5, 6].map((step) => (
        <React.Fragment key={step}>
          <div className={styles["point-outer"]}>
            <div className={styles["point-inner"]}>
              <div
                className={`
                  ${styles["point-inner-inner"]} 
                  ${currentStep === step ? styles.blink : ""}
                  ${maxStepReached >= step ? styles["solid-dot"] : ""}
                `}
              />
            </div>
          </div>
          {step < 6 && <div className={styles.line} />}
        </React.Fragment>
      ))}
    </section>
  );
};

export default ProgressLine;