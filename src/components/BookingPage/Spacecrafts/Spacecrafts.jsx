import React, { useState, useEffect } from "react";
import styles from "../Adventures/Adventures.module.css";

const Spacecrafts = ({ onSelect, selectedId }) => {
  const [localSelectedId, setLocalSelectedId] = useState(null);

  useEffect(() => {
    if (selectedId) {
      setLocalSelectedId(selectedId);
    }
  }, [selectedId]);

  const spacecrafts = [
    { id: 7, title: "Starship", image: "starship.jpg" },
    { id: 8, title: "Falcon", image: "falcon.jpg" },
    { id: 9, title: "Gaganyaan", image: "gaganyan.jpg" }
  ];

  const handleSelect = (id, title, image) => {
    setLocalSelectedId(id);
    onSelect({ id, title, image });
  };

  return (
    <div className={styles.Spacecrafts}>
      <h3 className={styles.head3}>Select Spacecraft</h3>
      <div className={styles.options}>
        {spacecrafts.map((craft) => (
          <div
            key={craft.id}
            id={craft.id}
            className={`${styles.option} ${
              localSelectedId === craft.id ? styles['selected-option'] : ''
            }`}
            style={{ backgroundImage: `url(assets/images/${craft.image})` }}
            onClick={() => handleSelect(craft.id, craft.title, craft.image)}
          >
            <h1 className={styles.cover_title}>{craft.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Spacecrafts;