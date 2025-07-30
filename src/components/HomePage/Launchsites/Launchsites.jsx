import styles from "../Adventures/Adventures.module.css";

import React from 'react';

export default function Launchsites() {
  const launchSites = [
    {
      name: "Chennai",
      image: "assets/images/launchsite1.webp",
      title: "Chennai, India",
      description: [
        "Location: Tamil Nadu, India.",
        "Best for: Earth orbits, Moon missions.",
        "Weather: Warm & stable for frequent launches.",
        "Highlight: ISRO-backed site with advanced tech.",
        "ISRO's Premier Spaceport 🇮🇳"
      ]
    },
    {
      name: "Monaco",
      image: "assets/images/launchsite2.webp",
      title: "Monaco, Europe",
      description: [
        "Location: Monte Carlo, Monaco.",
        "Best for: Private space tourism & orbital stays.",
        "Weather: Mild, low turbulence for smooth launches.",
        "Highlight: Exclusive VIP space travel experience.",
        "High-Tech Space Hub 🇪🇺"
      ]
    },
    {
      name: "San Francisco",
      image: "assets/images/launchsite3.webp",
      title: "San Francisco, USA",
      description: [
        "Location: California, USA.",
        "Best for: Mars & deep-space missions.",
        "Weather: Ideal conditions for heavy-lift rockets.",
        "Highlight: AI-controlled launch systems.",
        "Cutting-Edge Spaceport 🇺🇸"
      ]
    },
    {
      name: "Tokyo",
      image: "assets/images/launchsite4.webp",
      title: "Tokyo, Japan",
      description: [
        "Location: Japan's Pacific Coast.",
        "Best for: Space parks, lunar missions.",
        "Weather: Advanced all-weather launch technology.",
        "Highlight: Home to Asia's first space tourism program.",
        "🇯🇵 Future Space Gateway"
      ]
    }
  ];

  return (
    <section className={styles.Launchsites}>
      <h2>Our Launch Sites</h2>
      <div className={styles.card_list}>
        {launchSites.map((site, index) => (
          <div className={styles.card} style={{ width: `${0.42* window.innerWidth}px` }} key={index}>
            <div 
              className={styles['card-upper']}
              style={{
                backgroundImage: `linear-gradient(to top right, black 20%, transparent 100%), url(${site.image})`
              }}
            >
              <h2>{site.title}</h2>
              <ul className={styles.description}>
                {site.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles["card-shadow"]}></div>
          </div>
        ))}
        <div className={styles.scrollArrow}>
            <i className="bi bi-arrow-right-circle-fill"></i>
        </div>
      </div>
    </section>
  );
}
