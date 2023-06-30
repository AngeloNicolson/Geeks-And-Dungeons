import React from "react";
import styles from "./Navigation.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "../Buttons/Login-Logout/logout-button";
import { LoginButton } from "../Buttons/Login-Logout/login-button";
import CreatureButton from "../Buttons/CreatureButton/CreatureButton";

const Navigation = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className={styles.mainNavigation}>
      <div className={styles.leftNavigation}>
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
      </div>
      <div className={styles.centerNavigation}>
        <CreatureButton />
      </div>
      <div className={styles.rightNavigation}>
        <ul className={styles.personalNavigation}>
          {!isAuthenticated && (
            <>
              <li>
                <a href="/profile" className={styles.navigationItem}>
                  PROFILE
                </a>
              </li>
              <li className={styles.navigationItem}>
                <LoginButton />
              </li>
            </>
          )}
          {isAuthenticated && (
            <>
              <li>
                <a href="/profile" className={styles.navigationItem}>
                  PROFILE
                </a>
              </li>
              <li className={styles.navigationItem}>
                <LogoutButton />
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
