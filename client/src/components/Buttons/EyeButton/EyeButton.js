import React, { Component, useState } from "react";

import styles from "./EyeButton.module.css";

// Use the prop to pass the title into this button. You will also need to pass name into the CSS file for the secondary name to show up.
// Otherwise it will still show submit as the secondary title
// Will need to fix alter this when I learn another way i can handle the secondary title
const EyeButton = () => {
  return (
    <>
      <button className={styles.enterThreadButton}>
        <svg width="0" height="0">
          <filter id="black-heart">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -16"
              result="goo"
            />
            <feTurbulence baseFrequency="0.052" numOctaves="1" />

            <feDisplacementMap
              id="displacement"
              in="blur"
              scale="17"
              xChannelSelector="r"
              yChannelSelector="b"
            />

            <feBlend id="blend-mode" in="gooey" mode="overlay" />
          </filter>
        </svg>
        <div className={styles.black_heart}>
          <ul className={styles.heart_container}>
            <li className={styles.bubble} id="bubble"></li>
          </ul>
        </div>
      </button>
    </>
  );
};
export default EyeButton;
