import React from "react";
import Segment from "../Segment/Segment";
import styles from "./TopicTitle.module.css";

const Titles = () => {
  return (
    <div className={styles.titles}>
      <Segment title="Games" />
      <Segment title="Movies" />
      <Segment title="Props" />
      <Segment title="Books" />
      <Segment title="Community" />
    </div>
  );
};

export default Titles;
