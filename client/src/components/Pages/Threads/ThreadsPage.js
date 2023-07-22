import { React, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// PAGE ELEMENTS
import ErrorMessage from "../../ErrorHandler/ErrorMessage.js";
import Navigation from "../../Navigation/Navigation.js";
import ThreadFeed from "./ThreadFeed/ThreadFeed.js";
import ThreadSkeleton from "./ThreadFeed/ThreadSkeleton.js";
// STYLES
import styles from "../PageLayout.module.css";
// API
import api from "../../../Api";

const ThreadPage = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const fetchThreads = async () => {
    try {
      const threadResults = await api.getThreads();
      if (!threadResults.ok) {
        throw new Error("Failed to fetch threads");
      }
      const threadData = await threadResults.json();
      setThreads(threadData);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  };

  const handleThreadDelete = async (threadId) => {
    try {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        const userId = await user.sub;

        const deleteResult = await api.deleteThread(
          threadId,
          accessToken,
          userId
        );
        if (!deleteResult.ok) {
          throw new Error("Failed to delete thread");
        }
        // Refresh the thread list after deletion
        fetchThreads();
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  return (
    <>
      <Navigation />
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <div className={styles.body_inner}>
        <div className={styles.div_identification}>
          {loading ? (
            // Render the ThreadSkeleton component while loading
            Array.from({ length: 15 }).map((_, index) => (
              <ThreadSkeleton key={index} />
            ))
          ) : (
            // Render the ThreadFeed component when data is loaded
            <ThreadFeed
              threads={threads}
              loggedInUser={user}
              handleThreadDelete={handleThreadDelete}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ThreadPage;
/*
-------------------------------------
CREDITS
-------------------------------------
 */
