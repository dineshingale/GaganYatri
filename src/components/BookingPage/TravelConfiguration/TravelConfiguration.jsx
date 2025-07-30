import React from "react";
import styles from "../Adventures/Adventures.module.css";

const TravelConfiguration = ({ options }) => {
  return (
    <div className={styles.TravelConfiguration}>
      <h3 className={styles.head3}>Your Travel Configuration</h3>
      <div className={styles.options}>
        {options.adventure && (
          <div 
            id="conformed-Adventure"
            className={`${styles.option} ${styles['final-conformed']}`}
            style={{ backgroundImage: `url(assets/images/${options.adventure.image})` }}
          >
            <h1 className={styles.cover_title}>{options.adventure.title}</h1>
          </div>
        )}
        {options.spacecraft && (
          <div 
            id="conformed-Spacecraft"
            className={`${styles.option} ${styles['final-conformed']}`}
            style={{ backgroundImage: `url(assets/images/${options.spacecraft.image})` }}
          >
            <h1 className={styles.cover_title}>{options.spacecraft.title}</h1>
          </div>
        )}
        {options.launchsite && (
          <div 
            id="conformed-Launchsite"
            className={`${styles.option} ${styles['final-conformed']}`}
            style={{ backgroundImage: `url(assets/images/${options.launchsite.image})` }}
          >
            <h1 className={styles.cover_title}>{options.launchsite.title}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelConfiguration;