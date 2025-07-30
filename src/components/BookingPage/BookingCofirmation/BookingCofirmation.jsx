import React , {useState, useEffect} from "react";
import styles from "./BookingCofirmation.module.css";
import { saveBookingToDatabase } from "../../../api/bookingService";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay.jsx";
//import { sendBookingEmail } from "../../../api/emailService";

const BookingConfirmation = ({ selectedOptions = {}, passengers = [] }) => {
  const [isProcessing, setIsProcessing] = useState(true);
 // const [processingComplete, setProcessingComplete] = useState(false);
  const [error, setError] = useState(null);
  
  const leader = passengers.find(p => p.isLeader);
  const companions = passengers.filter(p => !p.isLeader);
  const { adventure, spacecraft, launchsite } = selectedOptions;

  useEffect(() => {
    const processBooking = async () => {
      try {
        const bookingData = {
          selectedOptions,
          passengers,
          createdAt: new Date().toISOString(),
        };

        // A single call that handles everything!
        await saveBookingToDatabase(bookingData);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsProcessing(false);
      }
    };
    processBooking();

  }, [selectedOptions, passengers]);

  if (isProcessing) {
    return <LoadingOverlay />;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.confirmationContainer}>
      <h1 className={styles.confirmationTitle}>Booking Confirmation</h1>

      <div className={styles.tripDetails}>
        <h2><i className="bi bi-flag"></i> Your Space Adventure Awaits</h2>
        <p>
          You're all set for an exciting journey on the{" "}
          <strong>{spacecraft?.title || "spacecraft"}</strong>{" "}
          <i className="bi bi-rocket-takeoff"></i>, launching from{" "}
          <strong>{launchsite?.title || "your selected site"}</strong>.
        </p>
        <p>
          Get ready to explore{" "}
          <strong>{adventure?.title || "your chosen destination"}</strong> —
          an experience that's sure to leave you inspired.
        </p>
      </div>

      <div className={styles.passengerDetails}>
        <h2><i className="bi bi-person"></i> Leader Details</h2>
        {leader ? (
          <>
            <p><strong>Name:</strong> {leader.name}</p>
            <p><strong>Phone:</strong> {leader.phone}</p>
            <p><strong>Email:</strong> {leader.email}</p>
            <p><strong>Address:</strong> {leader.address}</p>
          </>
        ) : (
          <p>No leader assigned.</p>
        )}

        {companions.length > 0 && (
          <>
            <h2><i className="bi bi-people"></i> Companions</h2>
            <ul>
              {companions.map((p, i) => (
                <li key={i}>
                  {p.name}, Age {p.age}, {p.gender}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className={styles.confirmationMessage}>
        <p>
          <i className="bi bi-envelope-check"></i> A confirmation email has
          been sent to <strong>{leader?.email || "your registered email"}</strong>.
        </p>
        <p>
          <i className="bi bi-stars"></i> Get ready for your incredible journey through space!
        </p>
      </div>
    </div>
  );
};

export default BookingConfirmation;