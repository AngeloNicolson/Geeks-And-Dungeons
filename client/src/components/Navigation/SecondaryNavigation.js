import React from "react";
import styles from "./Navigation.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "../Buttons/Login-Logout/logout-button";
import { LoginButton } from "../Buttons/Login-Logout/login-button";

const SecondaryNavigation = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      <ul className={styles.personalNavigation}>
        {!isAuthenticated && (
          <>
            <LoginButton className={styles.navigationItem} />
          </>
        )}
        {isAuthenticated && (
          <>
            <a href="/profile" className={styles.navigationItem}>
              PROFILE
            </a>
            <LogoutButton />
          </>
        )}
      </ul>
    </div>
  );
};

export default SecondaryNavigation;
