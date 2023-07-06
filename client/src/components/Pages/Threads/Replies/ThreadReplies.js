import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { formatDate } from "../../../../Utils/formatDate";
// PAGE ELEMENTS
import ErrorMessage from "../../../ErrorHandler/ErrorMessage";

// STYLES
import styles from "./ThreadReplies.module.css";
// API
import api from "../../../../Api";

const ReplyChain = () => {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [replies, setReplies] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const textAreaRef = useRef(null);

  useEffect(() => {
    fetchReplies();
  }, [id]);

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

  useEffect(() => {
    const getUser = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const userProfile = await api.getUserProfile(user.sub, accessToken);

        if (userProfile && userProfile.length > 0 && userProfile[0].username) {
          setAuthor(userProfile[0].username);
        } else {
          setErrorMessage(
            "User profile data is not available. Please logout and login again"
          );
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    if (!isLoading) {
      getUser();
    }
  }, [user.sub, isLoading, getAccessTokenSilently]);

  const handleReplySubmit = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await api.createReply(text, id, author, accessToken);
      if (response.ok) {
        // Reset the reply text
        setText("");
        setIsFocused(false);
        // Fetch the updated replies
        fetchReplies();
      } else {
        setErrorMessage("Failed to submit reply");
      }
    } catch (error) {
      setErrorMessage("Failed to submit reply");
      console.error(error);
    }
  };

  const handleCancelComment = () => {
    setText("");
    setIsFocused(false);
  };

  useEffect(() => {
    const textAreaElement = textAreaRef.current;
    if (textAreaElement) {
      textAreaElement.style.height = ".5rem";
      textAreaElement.style.height = `${textAreaElement.scrollHeight}px`;
    }
  }, [text]);

  const handleTextAreaFocus = () => {
    setIsFocused(true);
  };

  const handleTextAreaBlur = () => {
    if (text === "") {
      setIsFocused(false);
    } else {
      return;
    }
  };

  const isCommentDisabled = text.trim().length === 0;
  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  return (
    <div className={styles.replyContainer}>
      <div className={styles.commentContainer}>
        <textarea
          value={text}
          ref={textAreaRef}
          onBlur={handleTextAreaBlur}
          onFocus={handleTextAreaFocus}
          placeholder="What do you think?"
          className={styles.replyTextArea}
          style={{ resize: "none" }}
          onChange={(e) => setText(e.target.value)}
        />
        {isFocused && (
          <div className={styles.commentButtonContainer}>
            <button
              className={styles.commentButton}
              onClick={handleCancelComment}
            >
              Cancel
            </button>
            <button
              onClick={handleReplySubmit}
              className={
                isCommentDisabled ? styles.disabledButton : styles.commentButton
              }
            >
              Comment
            </button>
          </div>
        )}
      </div>
      {replies.map((reply) => (
        <div key={reply.reply_id} className={styles.replyCard}>
          <div className={styles.replyContent}>
            <p className={styles.replyTitle}>
              <span className={styles.author}>{reply.author}</span>
              <span className={styles.dot}> • </span>
              <span className={styles.date}>
                {formatDate(reply.created_at)}
              </span>
            </p>
            <p className={styles.replyText}>{reply.reply_text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReplyChain;
