import React from "react";

import styles from "./SubmitButtonHealthVial.module.css";
import "./SubmitButtonHealthVial.module.css";

// Use the prop to pass the title into this button. You will also need to pass name into the CSS file for the secondary name to show up.
// Otherwise it will still show submit as the secondary title
// Will need to fix alter this when I learn another way i can handle the secondary title
const SubmitButtonHealVial = (props) => {
  return (
    <>
      <button
        className={styles.submitHealthButton}
        style={{ "--content": "Submit" }}
      >
        <div className={styles.buttonGlass}>
          <div className={styles.left}> </div>

          <div className={styles.title}>{props.title}</div>
          <div className={styles.right}></div>
        </div>
      </button>
    </>
  );
};
export default SubmitButtonHealVial;
