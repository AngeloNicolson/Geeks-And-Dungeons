import React from "react";
import { Html } from "@react-three/drei";
import styles from "./Hud.module.css";

const Hud = ({ position, onClose, onAnnotationClick, ...props }) => {
  return (
    <group position={position}>
      {/* Render the menu in front of the camera */}
      <Html {...props} transform occlude="blending">
        <div className={styles.menu}>
          <button
            className={styles.button}
            onClick={() => onAnnotationClick("about-me")}
          >
            About Me
          </button>
          <button
            className={styles.button}
            onClick={() => onAnnotationClick("about-the-project")}
          >
            About The Project
          </button>
          <button
            className={styles.button}
            onClick={() => onAnnotationClick("my-interests")}
          >
            My Interests
          </button>
          {/* Add other buttons or elements as needed */}
        </div>
      </Html>
      {/* Add other components or annotations you want to attach to the hud */}
      {/* ... */}
    </group>
  );
};

export default Hud;
