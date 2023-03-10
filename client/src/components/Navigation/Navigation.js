import React from "react";

// Element imports
import SecondaryNavigation from "./SecondaryNavigation";

// CSS modules
import styles from "./Navigation.module.css";

const Navigation = () => {
  // Nav Items are place holder and will need to change as website develops.
  const navItems = ["Forums", "Meet people", "Profile", "Log out"];
  return (
    <div className={styles.navigation}>
      <div className={styles.mainNavigation}>
        {/* <img src="" alt="" /> */}
        <ul className={styles.navigationList}>
          {navItems.map((item) => {
            return (
              <li className={styles.navigationItem} key={item}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <SecondaryNavigation />
    </div>
  );
};

export default Navigation;
