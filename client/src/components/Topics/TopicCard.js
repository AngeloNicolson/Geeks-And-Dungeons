import React, { useState } from "react";

export default function TopicCard({ topicCard, handleChoice, flipped }) {
  const handleClick = () => {
    handleChoice(topicCard);
  };

  return (
    <div className={`card ${flipped ? "flip" : ""}`} onClick={handleClick}>
      {/* <div className="front">
        {topicCard.title} */}
      <div className="back">
        <p className="back_title">{topicCard.title}</p>
        <img className="back_img" src={topicCard.deck_back} />
      </div>
      <img className="front" src={topicCard.image_front} />
      {/* </div> */}
    </div>
  );
}
