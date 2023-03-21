// PAGE ELEMENTS
import { React, useState, useEffect } from "react";
import Navigation from "../../components/Navigation/Navigation.js";
import ThreadFeed from "./ThreadList.js";

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
      <div className={styles.body_inner}>
        <div className={styles.div_identification}>
          <ThreadFeed threads={threads} />
        </div>
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
