import React from "react";
import styles from "./Passengers.module.css";
import { usePassengers } from "./usePassengers"; // Import the custom hook

const Passengers = ({onNext,passengers, setPassengers }) => {
 const {
    currentPassengerIndex,
    passengerListRef,
    addPassenger,
    removePassenger,
    setLeader,
    handleInputChange,
    handleNext: handlePassengerNext,
    handlePrev,
    validatePassengers
  } = usePassengers(passengers, setPassengers); // Pass state into custom hook

  const handleSubmit = () => {
    if (!validatePassengers()) {
      alert("Please fill all required fields for each passenger");
      return;
    }
    if (typeof onNext === 'function') {
      onNext();
    }
  };

  const handleNextButton = () => {
    if (currentPassengerIndex === passengers.length - 1) {
      handleSubmit();
    } else {
      handlePassengerNext();
    }
  };

  return (
    <div className={styles.passengers}>
      <h3 className={styles.head3}>Passenger Details</h3>
      
      <form className={styles["passenger-form"]}>
        <div 
          id="passenger_list" 
          className={styles.passenger_list}
          ref={passengerListRef}
        >
          {passengers.map((passenger, index) => (
            <div 
              key={passenger.id} 
              className={`${styles.form_templete} ${index === currentPassengerIndex ? styles.active_passenger : ''}`}
            >
              <div className={styles.passenger_count}>
                <h3>Passenger {passenger.id}</h3>
                {passengers.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removePassenger(passenger.id)}
                    className={styles.remove_button}
                  >
                    ❌
                  </button>
                )}
              </div>

              <div className={`${styles.strip_outer} ${styles.border_glow_stage1}`}>
                <label>Name:</label>
                <input
                  className={`${styles.strip_inner} ${styles.border_glow_stage2}`}
                  type="text"
                  value={passenger.name}
                  onChange={(e) => handleInputChange(passenger.id, "name", e.target.value)}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className={`${styles.strip_outer} ${styles.border_glow_stage1}`}>
                <label>Phone:</label>
                <input
                  className={`${styles.strip_inner} ${styles.border_glow_stage2}`}
                  type="tel"
                  value={passenger.phone}
                  onChange={(e) => handleInputChange(passenger.id, "phone", e.target.value)}
                  placeholder="Enter phone number"
                  pattern="[0-9]{10}"
                  required
                />
              </div>

              <div className={`${styles.strip_outer} ${styles.border_glow_stage1}`}>
                <label>Age:</label>
                <input
                  className={`${styles.strip_inner} ${styles.border_glow_stage2}`}
                  type="number"
                  value={passenger.age}
                  onChange={(e) => handleInputChange(passenger.id, "age", e.target.value)}
                  placeholder="Enter age"
                  min="5"
                  max="100"
                  required
                />
              </div>

              <div className={`${styles.strip_outer} ${styles.border_glow_stage1}`}>
                <label>Gender:</label>
                <div className={styles.gender_options}>
                  <label>
                    <input
                      type="radio"
                      name={`gender_${passenger.id}`}
                      checked={passenger.gender === "Male"}
                      onChange={() => handleInputChange(passenger.id, "gender", "Male")}
                      required
                    /> Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`gender_${passenger.id}`}
                      checked={passenger.gender === "Female"}
                      onChange={() => handleInputChange(passenger.id, "gender", "Female")}
                    /> Female
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`gender_${passenger.id}`}
                      checked={passenger.gender === "Other"}
                      onChange={() => handleInputChange(passenger.id, "gender", "Other")}
                    /> Other
                  </label>
                </div>
              </div>

              <div className={styles.leader_selection}>
                <label>
                  <h4>Set them as your leader:</h4> 
                  <input
                    type="checkbox"
                    checked={passenger.isLeader}
                    onChange={() => setLeader(passenger.id)}
                  />
                </label>
              </div>

              {passenger.isLeader && (
                <div className={styles.leader_details}>
                  <div className={`${styles.strip_outer} ${styles.border_glow_stage1}`}>
                    <label>Email:</label>
                    <input
                      className={`${styles.strip_inner} ${styles.border_glow_stage2}`}
                      type="email"
                      value={passenger.email}
                      onChange={(e) => handleInputChange(passenger.id, "email", e.target.value)}
                      placeholder="Enter leader's email"
                      required
                    />
                  </div>
                  <div className={`${styles.strip_outer} ${styles.border_glow_stage1}`}>
                    <label>Address:</label>
                    <input
                      className={`${styles.strip_inner} ${styles.border_glow_stage2}`}
                      type="text"
                      value={passenger.address}
                      onChange={(e) => handleInputChange(passenger.id, "address", e.target.value)}
                      placeholder="Enter leader's address"
                      required
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.passenger_controls}>
          <button 
            type="button" 
            onClick={handlePrev}
            disabled={currentPassengerIndex === 0}
            className="btn btn-outline-light"
          >
            <i className="bi bi-arrow-left"></i>
            <span className={styles.buttonLabel}> Previous</span>
          </button>

          <button type="button" onClick={addPassenger} className="btn btn-outline-info">
            <i className="bi bi-person-plus"></i>
            <span className={styles.buttonLabel}> Add Passenger</span>
          </button>

          <button 
            type="button" 
            onClick={handleNextButton}
            disabled={currentPassengerIndex === passengers.length - 1}
            className="btn btn-outline-warning"
          >
            <span className={styles.buttonLabel}>Next </span>
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>

        

        <div className={styles.submit_button}>
        <button type="button" onClick={handleSubmit}>Submit All Passengers</button>
        </div>
      </form>
    </div>
  );
};

export default Passengers;