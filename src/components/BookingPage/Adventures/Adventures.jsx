import React, { useState, useEffect } from "react";
import styles from "./Adventures.module.css";

const Adventures = ({ onSelect, selectedId }) => {
  const [localSelectedId, setLocalSelectedId] = useState(null);

  useEffect(() => {
    if (selectedId) {
      setLocalSelectedId(selectedId);
    }
  }, [selectedId]);

  const adventures = [
    { id: 1, title: "View from 100km Above", image: "Adventure1.webp" },
    { id: 2, title: "Trip to Space Parks", image: "Adventure2.webp" },
    { id: 3, title: "Trip to Moon", image: "Adventure3.webp" },
    { id: 4, title: "Trip to Mars", image: "Adventure4.webp" },
    { id: 5, title: "Trip to Europa", image: "Adventure5.webp" },
    { id: 6, title: "Trip to Titan", image: "Adventure6.webp" }
  ];

  const handleSelect = (id, title, image) => {
    setLocalSelectedId(id);
    onSelect({ id, title, image });
  };

  return (
    <div className={styles.Adventures}>
      <h3 className={styles.head3}>Select Adventure</h3>
      <div className={styles.options}>
        {adventures.map((adventure) => (
          <div
            key={adventure.id}
            id={adventure.id}
            className={`${styles.option} ${
              localSelectedId === adventure.id ? styles['selected-option'] : ''
            }`}
            style={{ backgroundImage: `url(assets/images/${adventure.image})` }}
            onClick={() => handleSelect(adventure.id, adventure.title, adventure.image)}
          >
            <h1 className={styles.cover_title}>{adventure.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adventures;