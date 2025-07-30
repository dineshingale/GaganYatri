import styles from "./BookNow.module.css";

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookNow() {
  const navigate = useNavigate();

  function handleBookNow() {
    navigate('/book-now');
  }

  return (
    <section className={styles.booknow}>
      <h2>Book Your Adventure Now!</h2>
      <button onClick={handleBookNow}>Book Now</button>
    </section>
  );
}