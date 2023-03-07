import React, { useState } from "react";

const CreatePost = () => {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    try {
      const body = {
        post_text: text,
        updated_at: updated,
        topic: topic,
        author: userId,
      };

      await fetch(`localhost:5000/api/new-forum`, {
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
          <h1>Start forum</h1>
          <label>Text</label>
          <input
            type="text"
            value={Text}
            onChange={(event) => {
              setText(event.target.value);
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
