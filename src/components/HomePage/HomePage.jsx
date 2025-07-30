import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styles from "./HomePage.module.css";

import Header from './Header/Header';
import Adventures from './Adventures/Adventures';
import Spacecrafts from './Spacecrafts/Spacecrafts';
import Launchsites from './Launchsites/Launchsites';
import BookNow from './BookNow/BookNow';
import Footer from '../BookingPage/Footer/Footer';

export default function HomePage() {
  const location = useLocation();
  const exploreRef = useRef(null);

  useEffect(() => {
    if (location.state?.scrollTo === 'explore') {
      setTimeout(() => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }, 100);
    } else if (location.state?.scrollTo === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className={styles.homepage}>
      <Header />
      <Adventures />
      <Spacecrafts />
      <Launchsites />
      <BookNow />
      <Footer />
    </div>
  );
}
