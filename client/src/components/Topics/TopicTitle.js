import React from "react";
import Segment from "../Segment/Segment";
import styles from "./TopicTitle.module.css";

const Titles = () => {
  return (
    <div className={styles.titles}>
      <Segment title="Games" />
    </div>
  );
};

export default Titles;
