import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import BookingPage from './components/BookingPage/BookingPage'; 

import styles from './App.css';


export default function MyApp() {
 
  return (
    <BrowserRouter>
      <Routes className={styles.app}>
        <Route path="/" element={<HomePage />} />
        <Route path="/book-now" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}


