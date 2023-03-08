import React, { useState } from "react";

export default function TopicCard({ topicCard }) {
  const [flip, setFlip] = useState(false);

  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      {flip ? topicCard.category : topicCard.title}
    </div>
  );
}
