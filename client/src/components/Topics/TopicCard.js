import React, { useState } from "react";

export default function TopicCard({ topicCard }) {
  const [flip, setFlip] = useState(false);

  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      <div className="front">{topicCard.title}</div>
      <div className="back">
        {topicCard.title} " "{topicCard.category}
      </div>
    </div>
  );
}
