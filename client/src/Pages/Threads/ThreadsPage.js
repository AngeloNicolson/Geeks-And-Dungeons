// PAGE ELEMENTS
import { React, useState, useEffect } from "react";
import Navigation from "../../components/Navigation/Navigation.js";
import ThreadList from "./ThreadList.js";

// STYLES
import styles from "../PageLayout.module.css";
// API
import api from "../../Api";
function ThreadPage() {
  const [threads, setThreads] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const threadResults = await api.getThreads();
        const threadData = await threadResults.json();
        setThreads(threadData);
        console.log(threadData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Navigation />
      <div className={styles.body_inner}></div>
      <div className={styles.div_identification}>
        <ThreadList threads={threads} />
      </div>
    </>
  );
}

export default ThreadPage;

/*
-------------------------------------
CREDITS
-------------------------------------
- Developers institute
 */
