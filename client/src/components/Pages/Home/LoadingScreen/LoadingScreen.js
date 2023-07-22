import React from "react";
import styles from "./LoadingScreen.module.css";

const LoadingScreen = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.loading}>
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
