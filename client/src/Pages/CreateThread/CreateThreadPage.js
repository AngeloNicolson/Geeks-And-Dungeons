import { React, useState } from "react";

// API
import api from "../../Api";

// PAGE ELEMENTS
import Navigation from "../../components/Navigation/Navigation.js";
import Segment from "../../components/Segment/Segment";

// STYLES
import "./CreateThreadPage.css";
import styles from "../PageLayout.module.css";

function CreateThreadPage() {
  const [text, setText] = useState("");
  const [topic, SetTopic] = useState("");
  const [userID, SetUserID] = useState("");

  const handleSubmit = async () => {
    try {
      await api.createForumPost(text, topic, userID);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <Navigation />
      <div className={styles.body_inner}>
        <h1>Create thread</h1>
        <Segment title="games" />

        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Text
              <textarea
                name="postContent"
                value={text}
                onChange={(event) => setText(event.target.value)}
                required
              />
            </label>
            <label>Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(event) => {
                SetTopic(event.target.value);
              }}
              required
            />
            <label>userID</label>
            <input
              type="text"
              value={userID}
              onChange={(event) => {
                SetUserID(event.target.value);
              }}
              required
            />

            <button type="submit" value="submit">
              Post forum
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default CreateThreadPage;
