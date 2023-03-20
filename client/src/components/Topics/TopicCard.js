import React from "react";

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
        <img
          className="back_img"
          src={topicCard.deck_back}
          alt="topic_card_back"
        />
      </div>
      <img
        className="front"
        src={topicCard.image_front}
        alt="topic_card_front"
      />
      {/* </div> */}
    </div>
  );
}
