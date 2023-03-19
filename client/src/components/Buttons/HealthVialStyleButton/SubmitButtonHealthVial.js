import React from "react";

import styles from "./SubmitButtonHealthVial.module.css";
import "./SubmitButtonHealthVial.module.css";
const SubmitButtonHealVial = (props) => {
  return (
    <>
      <button
        className={styles.submitHealthButton}
        style={{ "--content": "Submit" }}
      >
        <div className={styles.buttonGlass}>
          <div className={styles.left}></div>
          <div>{props.title}</div>
          <div className={styles.right}></div>
        </div>
      </button>
    </>
  );
};
export default SubmitButtonHealVial;
