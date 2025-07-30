import React from 'react';

import styles from "./Adventures.module.css";

export default function Adventures() {
  const adventures = [
    {
      title: "View from 100 km Above",
      image: "assets/images/Adventure1.webp",
      description: [
        "Experience the Edge of Space!",
        "Travel to 100 km above Earth—the official boundary of space.",
        "See the curvature of Earth and the endless cosmos.",
        "Enjoy a few minutes of zero gravity.",
        "Feel the thrill of re-entry as you descend back to Earth."
      ]
    },
    {
      title: "Trip to Space Parks",
      image: "assets/images/Adventure2.webp",
      description: [
        "The First Amusement Park in Space!",
        "Visit a zero-gravity theme park orbiting Earth.",
        "Enjoy thrilling space roller coasters and rides.",
        "Experience a virtual spacewalk simulation.",
        "Relax in cosmic lounges with breathtaking views."
      ]
    },
    {
      title: "Trip to Moon",
      image: "assets/images/Adventure3.webp",
      description: [
        "Walk Where Legends Walked!",
        "Land on the Moon's surface and explore craters.",
        "Experience 1/6th of Earth's gravity—jump higher!",
        "Drive a lunar rover across rugged landscapes.",
        "Stay in a high-tech Moon base."
      ]
    },
    {
      title: "Trip to Mars",
      image: "assets/images/Adventure4.webp",
      description: [
        "Be Among the First Humans on Mars!",
        "Travel 225 million km to the Red Planet.",
        "Walk on Martian soil and experience low gravity.",
        "Explore Olympus Mons (the tallest volcano).",
        "Ride a Mars rover across ancient landscapes."
      ]
    },
    {
      title: "Trip to Europa",
      image: "assets/images/Adventure5.webp",
      description: [
        "Explore an Alien Ocean Beneath the Ice!",
        "Travel to Europa, one of the best spots to find alien life.",
        "Trek across glowing ice caves and frozen plains.",
        "Dive into Europa's hidden ocean using a submersible.",
        "Witness Jupiter's massive storms from the surface."
      ]
    },
    {
      title: "Trip to Titan",
      image: "assets/images/Adventure6.webp",
      description: [
        "Fly Over Titan's Methane Lakes!",
        "Visit Titan, Saturn's most fascinating moon.",
        "Experience low gravity—fly using a wingsuit!",
        "See Saturn's rings from Titan's hazy sky.",
        "Trek through orange-hued dunes and ice cliffs."
      ]
    }
  ];

 
  return (
    <div className={styles.Adventures}>
      <h2>Our Adventures</h2>
      <div className={styles.card_list}>
        {adventures.map((adventure, index) => (
          <div className={styles.card} style={{ width: `${0.35* window.innerWidth}px` , height: `${0.5*window.innerHeight}px` }} key={index}>
            <div 
              className={styles["card-upper"]} 
              style={{
                backgroundImage: `linear-gradient(to top right, black 20%, transparent 100%), url(${adventure.image})`
              }}
            >
              <h2>{adventure.title}</h2>
              <ul className={styles.description}>
                {adventure.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles["card-shadow"]}></div> {/* For kebab-case class names */}
          </div>
        ))}
        <div className={styles.scrollArrow}>
          <i className="bi bi-arrow-right-circle-fill"></i>
        </div>
      </div>
    </div>
  );
}
