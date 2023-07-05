import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// PAGE ELEMENTS
import ErrorMessage from "../../../ErrorHandler/ErrorMessage";
// STYLES
import styles from "./ThreadReplies.module.css";
// API
import api from "../../../../Api";

const ReplyChain = () => {
  const { id } = useParams();
  const [replies, setReplies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const replyChainResults = await api.getReplies(id);
        if (replyChainResults.ok) {
          const replyChainData = await replyChainResults.json();
          setReplies(replyChainData);
        } else {
          setErrorMessage("Failed to fetch replies");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch replies");
        console.error(error);
      }
    };

    fetchReplies();
  }, [id]);

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  return (
    <div className={styles.replyContainer}>
      {replies.map((reply) => (
        <div key={reply.reply_id} className={styles.replyCard}>
          <div className={styles.replyContent}>
            <p className={styles.replyTitle}>
              <span className={styles.author}>{reply.author}</span>
              <span className={styles.dot}> • </span>
              <span className={styles.date}>{reply.created_at}</span>
            </p>
            <p className={styles.replyText}>{reply.reply_text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReplyChain;
