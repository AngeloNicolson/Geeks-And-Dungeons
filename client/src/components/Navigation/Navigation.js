import React from "react";

// Element imports
import SecondaryNavigation from "./SecondaryNavigation";

// CSS modules
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <div className={styles.mainNavigation}>
        {/* <img src="" alt="" /> */}
        <ul className={styles.navigationList}>
          <li className={styles.navigationItem}>
            <a href="/">Forums</a>
          </li>
          <li className={styles.navigationItem}>
            <a href="meetpeople">Meet people</a>
          </li>
        </ul>
        <SecondaryNavigation />
      </div>
    </div>
  );
};

export default Navigation;
