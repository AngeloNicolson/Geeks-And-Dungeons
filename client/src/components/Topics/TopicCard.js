import React, { useState } from "react";

export default function TopicCard({ topicCard, handleChoice, flipped }) {
  // const [flip, setFlip] = useState(false);
  // const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    handleChoice(topicCard);
    console.log(topicCard);
  };

  return (
    <div
      // Old code, may need this if new prop passing doesnt work
      // className={`card ${flip ? "flip" : ""}`}
      // onClick={() => setFlip(!flip)}
      className={`card ${flipped ? "flip" : ""}`}
      onClick={handleClick}
    >
      <div className="front">{topicCard.title}</div>
      <div className="back">
        {topicCard.title} " "{topicCard.category}
      </div>
    </div>
  );
}
