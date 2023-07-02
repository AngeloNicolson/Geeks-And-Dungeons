import { React, useEffect, useState } from "react";
import Navigation from "../../Navigation/Navigation";
import Segment from "../../Segment/Segment.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SubmitButtonHealVial from "../../Buttons/HealthVialStyleButton/SubmitButtonHealthVial.js";
import { useAuth0 } from "@auth0/auth0-react";

// STYLES
import "./CreateThreadPage.css";
import styles from "../PageLayout.module.css";
import QuillToolbar, { modules, formats } from "../../TextEditor/TextEditor.js";

// API
import api from "../../../Api.js";

function CreateThreadPage() {
  const [text, setText] = useState("");
  const [topic, setTopic] = useState(0);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const { user, isLoading, getAccessTokenSilently } = useAuth0();

  const handleSubmit = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      await api.createThread(title, text, topic, author, accessToken);
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
        console.log(userProfile); // Check the value of userProfile
        console.log(userProfile[0]); // Check the value of userProfile[0]

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
            <QuillToolbar toolbarId={"t1"} />

            <ReactQuill
              theme="snow"
              value={text}
              onChange={setText}
              placeholder={"Start your awesome thread..."}
              modules={modules("t1")}
              formats={formats}
            />
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
