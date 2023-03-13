// PAGE ELEMENTS
import { React, useState } from "react";
import Navigation from "../../components/Navigation/Navigation.js";
import Segment from "../../components/Segment/Segment";

// STYLES
import "./CreateThreadPage.css";
import styles from "../PageLayout.module.css";

// API
import api from "../../Api";

function CreateThreadPage() {
  const [text, setText] = useState("");
  const [topic, SetTopic] = useState(0);
  const [userID, SetUserID] = useState("");

  const handleSubmit = async () => {
    try {
      await api.createForumPost(text, topic, userID);
    } catch (err) {
      console.error(err.message);
    }
  };
  // This function pulls the id from the segment child.
  // This is a work around for passing prop to parent. (May need to change in future depending on react)
  function getCardIdFromSegment(topic_id) {
    SetTopic(topic_id);
  }
  console.log(topic);
  return (
    <>
      <Navigation />
      <div className={styles.body_inner}>
        <h1>Create thread</h1>
        <Segment title="games" getCardIdFromSegment={getCardIdFromSegment} />
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Text
              <input
                name="postContent"
                value={text}
                onChange={(event) => setText(event.target.value)}
                required
              />
            </label>
            <br></br>
            <br></br>
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
