import React from "react";
import styles from "./Navigation.module.css";

const SecondaryNavigation = () => {
  return (
    <div>
      <ul className={styles.secondaryNavigation}>
        <li>Profile</li>
        <li>Log out</li>

        {/* Below are future features */}
        {/* <Search /> */}
        {/* <Notification /> */}
        {/* <UserMenu /> */}
      </ul>
    </div>
  );
};

export default SecondaryNavigation;
