import React, { useState } from "react";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [topic, SetTopic] = useState("");
  const [userID, SetUserID] = useState("");

  const handleSubmit = async () => {
    try {
      const body = {
        post_text: text,
        topic: topic,
        author: userID,
      };

      await fetch(`${process.env.REACT_APP_API_URL}/api/new-forum`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Start a forum</h1>
          <label>Text</label>
          <input
            type="text"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
            required
          />
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
export default CreatePost;
