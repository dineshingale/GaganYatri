// src/components/LoadingOverlay.jsx
import React from 'react';
import styles from './LoadingOverlay.module.css';

const LoadingOverlay = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Processing your booking, please wait...</p>
    </div>
  );
};

export default LoadingOverlay;