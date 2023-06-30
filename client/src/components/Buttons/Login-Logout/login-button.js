import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styles from "./login-logout.module.css";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
    });
  };

  return (
    <p className={styles.navigationItem} onClick={handleLogin}>
      LOG IN
    </p>
  );
};
