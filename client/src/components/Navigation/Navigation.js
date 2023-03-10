import React from "react";

import styles from "./Navigation.module.css";

const Navigation = () => {
  // Nav Items are place holder and will need to change as website develops.
  const navItems = ["Forums", "Meet people", "Profile", "Log out"];
  return (
    <div className={styles.navigation}>
      <img src="" alt="" />
      <ul>
        {navItems.map((item) => {
          <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default Navigation;
