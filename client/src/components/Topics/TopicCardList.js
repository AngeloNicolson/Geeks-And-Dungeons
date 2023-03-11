import { useEffect, useState } from "react";
import TopicCard from "./TopicCard";

export default function TopicCardList({ topiccards }) {
  // This will store the state of the card which has been selected.
  // This way we can the de-select it and flip it back over when onther is chosen.
  const [cardChoiceOne, setCardChoiceOne] = useState(null);
  const [cardChoiceTwo, setCardChoiceTwo] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleChoice = (topicCard) => {
    cardChoiceOne ? setCardChoiceTwo(topicCard) : setCardChoiceOne(topicCard);
  };
  useEffect(() => {
    if (cardChoiceOne && cardChoiceTwo) {
      if (cardChoiceOne.topic_id !== cardChoiceTwo.topic_id) {
        cardReset();
        console.log("Reset activated");
        // console.log(cardChoiceTwo);
      } else {
        console.log("Reset Not activated");
      }
    }
  }, [cardChoiceOne, cardChoiceTwo]);

  const cardReset = () => {
    setCardChoiceOne(cardChoiceTwo);
    setCardChoiceTwo(null);
    console.log(`setCardChoiceOne id set to Card ${cardChoiceTwo.topic_id}`);

    console.log(cardChoiceTwo);
    // console.log(cardChoiceOne);
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
              flipped={
                topicCard === cardChoiceOne || topicCard === cardChoiceTwo
              }
            />
          );
        })}
      </div>
    </div>
  );
}
