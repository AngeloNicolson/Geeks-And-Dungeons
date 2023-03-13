import React, { useState } from "react";

export default function TopicCard({ topicCard, handleChoice, flipped }) {
  const handleClick = () => {
    handleChoice(topicCard);
  };

  return (
    <div className={`card ${flipped ? "flip" : ""}`} onClick={handleClick}>
      {/* <div className="front">
        {topicCard.title} */}
      <img className="front" src={topicCard.deck_back} />
      {/* </div> */}
      <img className="back" src={topicCard.image_front} />
    </div>
  );
}
