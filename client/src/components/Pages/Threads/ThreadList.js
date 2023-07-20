import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// PAGE ELEMENTS
import ErrorMessage from "../../ErrorHandler/ErrorMessage";
import { formatDate } from "../../../Utils/formatDate";

// STYLES
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import styles from "./ThreadList.module.css";

const ThreadFeed = ({ threads, loggedInUser, handleThreadDelete }) => {
  const [deleteDropdowns, setDeleteDropdowns] = useState(new Map());
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const toggleDeleteDropdown = (threadId) => {
    setDeleteDropdowns((prevDropdowns) => {
      const newDropdowns = new Map(prevDropdowns);
      newDropdowns.set(threadId, !prevDropdowns.get(threadId));
      return newDropdowns;
    });
  };

  const handleDeleteThread = async (threadId) => {
    try {
      await handleThreadDelete(threadId);
    } catch (error) {
      setErrorMessage("Failed to delete thread");
    }
  };

  const handleButtonClick = (event, threadId) => {
    event.stopPropagation();
    navigate(`/thread/${threadId}`);
  };

  const isOwner = (thread) => {
    return loggedInUser && thread.auth0_id === loggedInUser.sub;
  };

  useEffect(() => {
    // Checks if menu button has not been been clicked to close the container
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDeleteDropdowns(new Map());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          {errorMessage && <ErrorMessage message={errorMessage} />}
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
                <div className={styles.dropdownContent} ref={dropdownRef}>
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
                </div>
              )}
            </div>
          </div>
          <div className={styles.threadContent}>
            <h3 className={styles.threadTitle}>{thread.thread_title}</h3>
          </div>
          <div className={styles.buttonGroup}>
            <div
              onClick={(event) => handleButtonClick(event, thread.thread_id)}
            >
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
