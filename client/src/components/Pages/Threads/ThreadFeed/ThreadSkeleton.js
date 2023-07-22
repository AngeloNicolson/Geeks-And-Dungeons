import React from "react";
import styles from "./ThreadFeed.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const ThreadSkeleton = () => {
  return (
    <div className={`${styles.threadItem} ${styles.skeletonThread}`}>
      <div className={styles.bar}>
        <p className={styles.author}>
          Posted by: <span className={styles.date}>Loading...</span>
        </p>
        <div className={styles.dropdownContainer}>
          <button className={`${styles.button} ${styles.dropdownButton}`}>
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>
        </div>
      </div>
      <div className={styles.threadContent}>
        <h3 className={styles.threadTitle}>Loading...</h3>
      </div>
      <div className={styles.buttonGroup}>
        <div>
          <button className={styles.button}>Comment</button>
        </div>
        <div>
          <button className={styles.button}>Share</button>
        </div>
      </div>
    </div>
  );
};

export default ThreadSkeleton;
