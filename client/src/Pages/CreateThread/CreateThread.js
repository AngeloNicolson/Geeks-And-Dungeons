import React, { useState } from "react";
import api from "../../Api";

const CreateThread = () => {
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
    </>
  );
};
export default CreateThread;
