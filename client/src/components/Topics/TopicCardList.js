import { useState } from "react";
import TopicCard from "./TopicCard";

export default function TopicCardList({ topiccards }) {
  // This will store the state ov which card has been selected.
  // This way we can the de-select it and flip it back over when onther is chosen.
  const [cardChoiceOne, setCarChoiceOne] = useState;
  const [cardChoiceTwo, setCarChoiceTwo] = useState;

  const handleChoice = (topicCard) => {
    cardChoiceOne ? setCarChoiceTwo(topicCard) : setCarChoiceOne(topicCard);
  };

  return (
    <div>
      <div className="card-grid">
        {topiccards.map((topicCard) => {
          return (
            <TopicCard
              topicCard={topicCard}
              key={topicCard.topic_id}
              handleChoice={handleChoice}
            />
          );
        })}
      </div>
    </div>
  );
}
