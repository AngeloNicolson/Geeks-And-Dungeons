import React from "react";
import styles from "./Navigation.module.css";

const SecondaryNavigation = () => {
  return (
    <div>
      <ul className={styles.personalNavigation}>
        <li>
          <a href="/profile" className={styles.navigationItem}>
            PROFILE
          </a>
        </li>
        <li>
          <a href="/logout" className={styles.navigationItem}>
            LOG OUT
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SecondaryNavigation;
