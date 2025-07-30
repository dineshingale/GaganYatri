import React, { useState, useEffect } from "react";
import styles from "../Adventures/Adventures.module.css";

const Launchsites = ({ onSelect, selectedId }) => {
  const [localSelectedId, setLocalSelectedId] = useState(null);

  useEffect(() => {
    if (selectedId) {
      setLocalSelectedId(selectedId);
    }
  }, [selectedId]);

  const launchsites = [
    { id: 10, title: "Chennai, India", image: "launchsite1.webp" },
    { id: 11, title: "San Francisco, USA", image: "launchsite2.webp" },
    { id: 12, title: "Monaco, Europe", image: "launchsite3.webp" },
    { id: 13, title: "Tokyo, Japan", image: "launchsite4.webp" }
  ];

  const handleSelect = (id, title, image) => {
    setLocalSelectedId(id);
    onSelect({ id, title, image });
  };

  return (
    <div className={styles.Launchsites}>
      <h3 className={styles.head3}>Select Launchsite</h3>
      <div className={styles.options}>
        {launchsites.map((site) => (
          <div
            key={site.id}
            id={site.id}
            className={`${styles.option} ${
              localSelectedId === site.id ? styles['selected-option'] : ''
            }`}
            style={{ backgroundImage: `url(assets/images/${site.image})` }}
            onClick={() => handleSelect(site.id, site.title, site.image)}
          >
            <h1 className={styles.cover_title}>{site.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Launchsites;