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
      <svg width="0" height="0">
        <filter id="black-heart-container">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 77 -77"
            result="goo"
          />
          <feTurbulence baseFrequency="0.052" numOctaves="1" />

          <feDisplacementMap
            id="displacement"
            in="blur"
            scale="27"
            xChannelSelector="G"
            yChannelSelector="B"
          />

          <feBlend id="blend-mode" in="gooey" mode="overlay" />
        </filter>
      </svg>
    </div>
  );
};

export default Navigation;
