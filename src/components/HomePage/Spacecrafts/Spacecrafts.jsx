import styles from "../Adventures/Adventures.module.css";

import React from 'react';

export default function Spacecrafts() {
  const spacecrafts = [
    {
      name: "Falcon",
      image: "assets/images/falcon.jpg",
      title: "Travel with Falcon",
      description: [
        "Designed for: Earth-to-space and lunar missions.",
        "Capacity: Up to 8 passengers with luxury space cabins.",
        "Speed: Reaches orbit in less than 9 minutes.",
        "Technology: Reusable booster for cost-effective travel.",
        "Safety: Advanced auto-landing system ensures smooth returns."
      ]
    },
    {
      name: "Gaganyaan",
      image: "assets/images/gaganyan.jpg",
      title: "Travel with Gaganyaan",
      description: [
        "Designed for: Manned missions to low Earth orbit.",
        "Capacity: 3 astronauts with AI-assisted navigation.",
        "Speed: Reaches 400 km orbit in 16 minutes.",
        "Technology: High radiation shielding for deep-space travel.",
        "Safety: Built with emergency escape system."
      ]
    },
    {
      name: "Starship",
      image: "assets/images/starship.jpg",
      title: "Travel with Starship",
      description: [
        "Designed for: Interplanetary travel (Moon, Mars, Europa, Titan).",
        "Capacity: Up to 100 passengers with full space hotel.",
        "Speed: Can reach Mars in just 3 months.",
        "Technology: Super heavy booster for long-range missions.",
        "Safety: Heat-resistant hull for safe atmospheric entry."
      ]
    }
  ];


  return (

    <section className={styles.Spacecrafts} id="redirected_location">
      <h2>Our Spacecrafts</h2>
      <div className={styles.card_list}>
        {spacecrafts.map((spacecraft, index) => (
          <div className={styles.card} style={{ width: `${0.5* window.innerWidth}px` }} key={index}>
            <div 
              className={styles['card-upper']}
              style={{
                backgroundImage: `linear-gradient(to top right, black 20%, transparent 100%), url(${spacecraft.image})`
              }}
            >
              <h2>{spacecraft.title}</h2>
              <ul className={styles.description}>
                {spacecraft.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles['card-shadow']}></div>
          </div>
        ))}
        <div className={styles.scrollArrow}>
          <i className="bi bi-arrow-right-circle-fill"></i>
        </div>
      </div>
    </section>
  );
}
