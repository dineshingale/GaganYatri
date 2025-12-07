import React from 'react';
import styles from './LoadingOverlay.module.css';

const LoadingOverlay = ({ text = 'Processing your booking, please wait...' }) => {
  return (
    <div className={styles.overlay} role="status" aria-live="polite">
      <div className={styles.spinner} />
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default LoadingOverlay;
