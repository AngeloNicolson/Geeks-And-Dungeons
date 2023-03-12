import React, { useState, useRef, useEffect } from "react";

// Style modules
import styles from "./Segment.module.css";

// Components
import ScrollRightIcon from "../../Assets/Icons/ScrollRightIcon";
import ScrollLeftIcon from "../../Assets/Icons/ScrollLeftIcon";
import TopicCard from "../Topics/TopicCard";

//Importing mock data until I understand how im going to make this work
import topic_data from "../../MockData/topicMockData";

// The segment is in control of the title and taking in the card categories
const Segment = ({ title }) => {
  let scroll = useRef(null);
  const [topiccards, setTopicCard] = useState(topic_data);
  const [scrollX, setscrollX] = useState(0);
  const [scrollEnd, setscrollEnd] = useState(false);
  const [hover, setIsHover] = useState(false);

  // This will store the state of the card which has been selected.
  // This way we can the de-select it and flip it back over when onther is chosen.
  const [cardChoiceOne, setCardChoiceOne] = useState(null);
  const [cardChoiceTwo, setCardChoiceTwo] = useState(null);

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
    // setIdFromList(setCardChoiceOne);
    // console.log(`setCardChoiceOne id set to Card ${cardChoiceTwo.topic_id}`);

    // console.log("inside reset", cardChoiceOne);
  };
  // console.log(setIdFromList);
  // console.log("Outside reset", cardChoiceOne);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  //Slide click
  const slide = (shift) => {
    scroll.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <=
      scroll.current.offsetWidth
    ) {
      setscrollEnd(true);
    } else {
      setscrollEnd(false);
    }
  };

  const scrollCheck = () => {
    setscrollX(scroll.current.scrollLeft);
    if (
      Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <=
      scroll.current.offsetWidth
    ) {
      setscrollEnd(true);
    } else {
      setscrollEnd(false);
    }
  };
  return (
    <div className={styles.segment}>
      <p className={styles.title}>{title}</p>
      <div
        className={styles.buttonContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={styles.segmentCards}
          ref={scroll}
          onScroll={scrollCheck}
        >
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
        {hover && scrollX !== 0 && (
          <button className={styles.buttonLeft} onClick={() => slide(-550)}>
            <ScrollLeftIcon />
          </button>
        )}
        {hover && !scrollEnd && (
          <button className={styles.buttonRight} onClick={() => slide(+550)}>
            <ScrollRightIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default Segment;
