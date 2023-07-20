import React from "react";
import { Html } from "@react-three/drei";
import styles from "./Annotation.module.css";

/* 
----------------------------------------
      3D ANNOTATION FOR RE-USE
----------------------------------------
*/
function Annotation({ children, onClose, ...props }) {
  return (
    <Html
      {...props}
      transform
      occlude="blending"
      //   geometry={<roundedPlaneGeometry args={[1.66, 0.47, 0.24]} />} // From an external library STill deciding on whether i use this or not
    >
      <div className={styles.annotation}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        {children}
        <div className={styles.buttonContainer}>
          <div
            onClick={() =>
              (window.location.href = "https://github.com/AngeloNicolson")
            }
            className={styles.socialNavigations}
          >
            GitHub
          </div>
          <div
            onClick={() =>
              (window.location.href =
                "https://www.linkedin.com/in/angelo-nicolson-5ab4b772/")
            }
            className={styles.socialNavigations}
          >
            Linkedin
          </div>
          <div
            onClick={() => (window.location.href = "/profile")}
            className={styles.socialNavigations}
          >
            Visit GnD
          </div>
        </div>
      </div>
    </Html>
  );
}

export default Annotation;
