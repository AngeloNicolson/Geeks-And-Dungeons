import React from "react";
import styles from "./errorMessage.module.css";

function ErrorMessage({ message }) {
  return <div className={styles.error_message}>{message}</div>;
}

export default ErrorMessage;
