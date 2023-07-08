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
  const { isLoading, user } = useAuth0();

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
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.body_inner}>
          <div className={styles.div_identification}>
            <ThreadFeed
              threads={threads}
              loggedInUserId={user ? user.sub : null}
            />
          </div>
        </div>
      )}
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
