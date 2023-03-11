import React, { useState } from "react";

export default function TopicCard({ topicCard, handleChoice }) {
  const [flip, setFlip] = useState(false);
  // const [flipped, setFlipped] = useState(false);
  //
  // Need to finda  way to deselc other cards so they flip back over
  //
  // const flipCard = () => {
  //   if (flip === true) {
  //     setFlipped(true);
  //   } else {
  //     setFlipped(true);
  //   }
  // };

  const handleClick = () => {
    handleChoice(topicCard);
  };

  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      <div className="back">{topicCard.title}</div>
      <div className="front" onClick={handleClick}>
        {topicCard.title} " "{topicCard.category}
      </div>
    </div>
  );
}
