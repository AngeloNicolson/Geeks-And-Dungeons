// PAGE ELEMENTS
import { React, useState, useEffect } from "react";
import Navigation from "../../Navigation/Navigation.js";
import ThreadFeed from "./ThreadList.js";
import ErrorMessage from "../../ErrorHandler/ErrorMessage.js";

// STYLES
import styles from "../PageLayout.module.css";
// API
import api from "../../../Api";

function ThreadPage() {
  const [threads, setThreads] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const threadResults = await api.getThreads();
        if (!threadResults.ok) {
          throw new Error("Failed to fetch threads");
        }
        const threadData = await threadResults.json();
        setThreads(threadData);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navigation />
      <div className={styles.body_inner}>
        <div className={styles.div_identification}>
          {errorMessage && <ErrorMessage message={errorMessage} />}
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
