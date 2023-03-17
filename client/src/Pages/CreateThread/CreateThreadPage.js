// PAGE ELEMENTS
import { React, useState } from "react";
import Navigation from "../../components/Navigation/Navigation.js";
import Segment from "../../components/Segment/Segment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
        <h1>Create thread</h1>
        <textarea
          className={styles.threadTitleEntry}
          type="text"
          rows={1}
          placeholder={"Thread Title"}
          value={title}
          onChange={(event) => {
            SetTitle(event.target.value);
          }}
        />

        <Segment title="games" getCardId={getCardId} />
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
            <QuillToolbar toolbarId={"t1"} />

            <ReactQuill
              theme="snow"
              value={text}
              onChange={SetText}
              placeholder={"Start your awesome thread..."}
              modules={modules("t1")}
              formats={formats}
            />
            <button
              type="submit"
              value="submit"
              className={styles.threadButton}
            >
              Post forum
            </button>
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
