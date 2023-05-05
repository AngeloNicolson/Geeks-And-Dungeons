import React from "react";

// Element imports
import SecondaryNavigation from "./SecondaryNavigation";

// CSS modules
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={styles.mainNavigation}>
      <ul className={styles.siteNavigation}>
        <li>
          <a href="/" className={styles.navigationItem}>
            FORUMS
          </a>
        </li>
        <li>
          <a href="meetpeople" className={styles.navigationItem}>
            MEET PEOPLE
          </a>
        </li>
      </ul>
      <a href="/home" className={styles.logo_home}>
        LOGO HERE
      </a>
      <SecondaryNavigation />
    </div>
  );
};

export default Navigation;
