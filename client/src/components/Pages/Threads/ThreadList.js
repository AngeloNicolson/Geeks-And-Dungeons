import React, { useState } from "react";
import styles from "./ThreadList.module.css";
import { formatDate } from "../../../Utils/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const ThreadFeed = ({ threads, loggedInUser }) => {
  const [deleteDropdowns, setDeleteDropdowns] = useState(new Map());

  const handleDeleteThread = (threadId) => {
    console.log("Delete thread with ID:", threadId);
  };

  const toggleDeleteDropdown = (threadId) => {
    setDeleteDropdowns((prevDropdowns) => {
      const newDropdowns = new Map(prevDropdowns);
      newDropdowns.set(threadId, !prevDropdowns.get(threadId));
      return newDropdowns;
    });
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
    console.log("button clicked:");
  };

  const isOwner = (thread) => {
    console.log("THreadList", loggedInUser);
    return loggedInUser && thread.auth0_id === loggedInUser.sub;
  };

  return (
    <div className={styles.threadCard}>
      {threads.map((thread) => (
        <div
          className={styles.threadItem}
          key={thread.thread_id}
          onClick={() => {
            window.location.href = `/thread/${thread.thread_id}`;
          }}
        >
          <div className={styles.bar}>
            <p className={styles.author}>
              Posted by: {thread.author_username}{" "}
              <span className={styles.date}>
                {formatDate(thread.created_at)}
              </span>
            </p>
            <div className={styles.dropdownContainer}>
              <button
                className={`${styles.button} ${styles.dropdownButton}`}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleDeleteDropdown(thread.thread_id);
                }}
              >
                <FontAwesomeIcon icon={faEllipsisH} />
              </button>
              {deleteDropdowns.get(thread.thread_id) && (
                <div className={styles.dropdownContent}>
                  {isOwner(thread) && (
                    <button
                      className={styles.deleteButton}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeleteThread(thread.thread_id);
                      }}
                    >
                      Delete
                    </button>
                  )}

                  <button
                    className={styles.deleteButton}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteThread(thread.thread_id);
                    }}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.threadContent}>
            <h3 className={styles.threadTitle}>{thread.thread_title}</h3>
          </div>
          <div className={styles.buttonGroup}>
            <div onClick={handleButtonClick}>
              <button className={styles.button}>Comment</button>
            </div>
            <div onClick={handleButtonClick}>
              <button className={styles.button}>Share</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThreadFeed;
