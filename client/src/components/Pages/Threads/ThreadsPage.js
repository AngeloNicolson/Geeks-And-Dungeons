import { useAuth0 } from "@auth0/auth0-react";

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
  const { user, isAuthenticated } = useAuth0();
  console.log("ThreadsPages", user);
  useEffect(() => {
    console.log("UseEffect", user);

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
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <div className={styles.body_inner}>
        <div className={styles.div_identification}>
          <ThreadFeed threads={threads} loggedInUser={user} />
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
