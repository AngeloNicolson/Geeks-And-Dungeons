import React, { useState, useEffect, useRef } from "react";

import styles from "./EyeButton.module.css";

// Use the prop to pass the title into this button. You will also need to pass name into the CSS file for the secondary name to show up.
// Otherwise it will still show submit as the secondary title
// Will need to fix alter this when I learn another way i can handle the secondary title
const EyeButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [bubblePosition, setBubblePosition] = useState({ x: 140, y: 77 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const outerCircleRef = useRef(null);
  const movementRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 120, y: 77 });
  };

  const interpolate = (start, end, factor) => {
    return start * (1 - factor) + end * factor;
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      const buttonRect = outerCircleRef.current.getBoundingClientRect();
      const x = event.clientX - buttonRect.left;
      const y = event.clientY - buttonRect.top;
      setBubblePosition((prevPosition) => ({
        x: interpolate(prevPosition.x, x, 0.1),
        y: interpolate(prevPosition.y, y, 0.1),
      }));
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered]);

  useEffect(() => {
    if (!isHovered && !movementRef.current) {
      movementRef.current = setInterval(() => {
        setBubblePosition((prevPosition) => ({
          x: interpolate(prevPosition.x, 140, 0.1),
          y: interpolate(prevPosition.y, 77, 0.1),
        }));
      }, 16);
    } else if (isHovered && movementRef.current) {
      clearInterval(movementRef.current);
      movementRef.current = null;
    }
  }, [isHovered, mousePosition]);
  return (
    <div
      className={styles["outer-circle"]}
      ref={outerCircleRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg width="0" height="0">
        <filter id="black-heart-container">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 77 -77"
            result="goo"
          />
          <feTurbulence baseFrequency="0.052" numOctaves="1" />

          <feDisplacementMap
            id="displacement"
            in="blur"
            scale="27"
            xChannelSelector="G"
            yChannelSelector="B"
          />

          <feBlend id="blend-mode" in="gooey" mode="overlay" />
        </filter>
      </svg>
      <div
        className={styles["black-heart"]}
        style={{
          left: `${bubblePosition.x - 2}px`,
          top: `${bubblePosition.y - 2}px`,
        }}
      />
    </div>
  );
};
export default EyeButton;
