import React from "react";
import { Html } from "@react-three/drei";
import styles from "./Annotation.module.css";

function Annotation({ children, onClose, ...props }) {
  return (
    <Html
      {...props}
      transform
      occlude="blending"
      //   geometry={<roundedPlaneGeometry args={[1.66, 0.47, 0.24]} />} // From an external library
    >
      <div className={styles.annotation}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </Html>
  );
}

export default Annotation;
