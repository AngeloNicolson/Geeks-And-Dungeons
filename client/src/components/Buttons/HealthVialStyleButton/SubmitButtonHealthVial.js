import React from "react";

import styles from "./SubmitButtonHealthVial.module.css";
import "./SubmitButtonHealthVial.module.css";
const SubmitButtonHealVial = () => {
  return (
    <>
      <div className={styles.buttonGlass}>
        <button
          className={styles.submitHealthButton}
          style={{ "--content": "Submit" }}
        >
          <div className={styles.left}></div>
          Submit
          <div className={styles.right}></div>
        </button>
      </div>
    </>
  );
};
export default SubmitButtonHealVial;
