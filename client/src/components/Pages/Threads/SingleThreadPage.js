import { useParams } from "react-router-dom";
import ErrorMessage from "../../ErrorHandler/ErrorMessage";
import { formatDate } from "../../../Utils/formatDate";
// PAGE ELEMENTS
import { React, useState, useEffect } from "react";
import Navigation from "../../Navigation/Navigation";

// STYLES
import styles from "./SingleThreadPage.module.css";
// API
import api from "../../../Api";

const SingleThreadPage = () => {
  const { id } = useParams();
  const [thread, setThread] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    //Abort controller to stop memory leaks from asyc functions
    //https://blog.logrocket.com/complete-guide-abortcontroller-node-js/
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const singleThreadResults = await api.getSingleThread(id);
        const singleThreadData = await singleThreadResults.json();
        setThread(singleThreadData);
      } catch (error) {
        if (!abortController.signal.aborted) {
          setErrorMessage(true);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [id]);

  return (
    <>
      <Navigation />
      <div className={styles.pageContainer}>
        {errorMessage ? (
          <ErrorMessage message="Failed to fetch thread data." />
        ) : (
          <div className={styles.threadCard}>
            <div key={thread.thread_id} className={styles.threadItem}>
              <div className={styles.threadContent}>
                <h3 className={styles.threadTitle}>{thread.thread_title}</h3>
                <div
                  className={styles.threadText}
                  dangerouslySetInnerHTML={{ __html: thread.thread_text }}
                />
                <div className={styles.bar}>
                  <p className={styles.author}>
                    Posted by: {thread.author}{" "}
                    {thread.created_at ? (
                      <span className={styles.date}>
                        {formatDate(thread.created_at)}
                      </span>
                    ) : (
                      <span className={styles.date}>Loading...</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleThreadPage;

/*
-------------------------------------
CREDITS
-------------------------------------
 */
