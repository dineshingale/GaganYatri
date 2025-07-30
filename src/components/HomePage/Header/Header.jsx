import styles from "./Header.module.css";
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  function handleBookNow() {
    navigate('/book-now');
  }

  function handleExploreNow() {
    window.scrollBy({
      top: window.innerHeight, // 100vh
      behavior: 'smooth'
    });
  }

  return (
    <header className={styles.header}>
      <video src="/assets/videos/Homepage_title_video.mp4" autoPlay loop muted />
      <h1>Welcome to GaganYatri</h1>
      <p>
        Your buddy 😎 for space travel
        <br />
        Experience the thrill of space exploration!
      </p>
      <div className={styles.buttonGroup}>
        <button onClick={handleExploreNow}>Explore Now</button>
        <button onClick={handleBookNow}>Book Now</button>
      </div>
    </header>
  );
}
