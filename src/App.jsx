import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Booking from './components/Booking/Booking';
import { SpeedInsights } from "@vercel/speed-insights/react"

import styles from './App.css';


export default function MyApp() {
 
  return (
    <BrowserRouter>
      <Routes className={styles.app}>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<Booking/>}/>
      </Routes>
      <SpeedInsights />
    </BrowserRouter>
  );
}