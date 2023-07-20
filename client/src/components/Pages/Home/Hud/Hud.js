import React from "react";
import { Html } from "@react-three/drei";
// STYLES
import styles from "./Hud.module.css";

const Hud = ({ position, onClose, onAnnotationClick, ...props }) => {
  return (
    <group position={[0, 0.5, 0]}>
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
            onClick={() => onAnnotationClick("my-interests")}
          >
            My Interests
          </button>
          <button
            className={styles.button}
            onClick={() => onAnnotationClick("about-the-project")}
          >
            About The Project
          </button>
        </div>
      </Html>
    </group>
  );
};

export default Hud;
