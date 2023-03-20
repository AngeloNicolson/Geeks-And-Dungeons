// PAGE ELEMENTS
import { React, useState } from "react";
import Navigation from "../../components/Navigation/Navigation.js";
import Segment from "../../components/Segment/Segment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SubmitButtonHealVial from "../../components/Buttons/HealthVialStyleButton/SubmitButtonHealthVial";

// STYLES
import "./CreateThreadPage.css";
import styles from "../PageLayout.module.css";
import QuillToolbar, {
  modules,
  formats,
} from "../../components/TextEditor/TextEditor";

// API
import api from "../../Api";

function CreateThreadPage() {
  const [text, SetText] = useState("");
  const [topic, SetTopic] = useState(0);
  const [title, SetTitle] = useState("");
  const [userID, SetUserID] = useState("");
  // const [value, setValue] = useState("");
  // console.log(title);
  const handleSubmit = async () => {
    try {
      await api.createThread(title, text, topic, userID);
    } catch (err) {
      console.error(err.message);
    }
  };
  // This function pulls the id from the segment child.
  // This is a work around for passing prop to parent.
  // (May need to change in future depending on how react handles this functionality in the future. Or if I use a library to handle this)
  function getCardId(topic_id) {
    SetTopic(topic_id);
  }
  return (
    <>
      <Navigation />
      <div className={styles.body_inner}>
        <h2 className={styles.pageTitle}>Pick your topic</h2>

        <div className={styles.threadPage_cards}>
          <Segment title="games" getCardId={getCardId} />
        </div>
        <h2 className={styles.pageTitle}>Conjure your thread</h2>
        <form onSubmit={handleSubmit}>
          <label>Text</label>
          <label>userID</label>
          <input
            type="text"
            value={userID}
            onChange={(event) => {
              SetUserID(event.target.value);
            }}
            required
          />
          <br />
          <div className={styles.editorContainer}>
            <input
              className={styles.threadTitleEntry}
              type="text"
              rows={1}
              placeholder={"Thread Title"}
              value={title}
              onChange={(event) => {
                SetTitle(event.target.value);
              }}
            />
            <QuillToolbar toolbarId={"t1"} />

            <ReactQuill
              theme="snow"
              value={text}
              onChange={SetText}
              placeholder={"Start your awesome thread..."}
              modules={modules("t1")}
              formats={formats}
            />
          </div>
          <div className={styles.custom_SubmitButton}>
            <SubmitButtonHealVial title="Submit" />
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
