import { React, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

// PAGE ELEMENTS
import Navigation from "../../Navigation/Navigation";
import Segment from "../../Segment/Segment.js";
import QuillEditor from "../../TextEditor/QuillEditor";
import "react-quill/dist/quill.snow.css";
import SubmitButtonHealVial from "../../Buttons/HealthVialStyleButton/SubmitButtonHealthVial.js";
import ErrorMessage from "../../ErrorHandler/ErrorMessage";

// STYLES
import "./CreateThreadPage.css";
import styles from "../PageLayout.module.css";

// API
import api from "../../../Api.js";

function CreateThreadPage() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [topic, setTopic] = useState(0);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, isLoading, getAccessTokenSilently } = useAuth0();

  const handleGetText = (value) => {
    setText(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await api.createThread(
        title,
        text,
        topic,
        author,
        accessToken
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        if (errorResponse.errors) {
          const errorMessages = errorResponse.errors.map(
            (error) => error.message
          );
          setErrorMessage(errorMessages.join(", "));
        } else {
          setErrorMessage(
            "Failed to submit. An unknown error occurred. Please try again later"
          );
        }
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        console.log(author);
        const accessToken = await getAccessTokenSilently();
        const userProfile = await api.getUserProfile(user.sub, accessToken);

        if (userProfile && userProfile.length > 0 && userProfile[0].username) {
          setAuthor(userProfile[0].username);
        } else {
          console.log("User profile data is not available");
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    if (!isLoading) {
      getUser();
    }
  }, [user.sub, isLoading, getAccessTokenSilently, author]);

  function getCardId(topic_id) {
    setTopic(topic_id);
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navigation />
      <div className={styles.body_inner}>
        <div className={styles.threadPage_cards}>
          <Segment title="games" getCardId={getCardId} />
        </div>
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <form onSubmit={handleSubmit}>
          <div className={styles.editorContainer}>
            <input
              className={styles.threadTitleEntry}
              type="text"
              rows={1}
              placeholder={"Thread Title"}
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <QuillEditor getText={handleGetText} />
            <div className={styles.custom_SubmitButton}>
              <SubmitButtonHealVial title="Submit" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateThreadPage;

/*
-------------------------------------
CREDITS
-------------------------------------
 */
