import React, { useState, useRef } from "react";

// Style modules
import styles from "./Segment.module.css";

// Components
import TopicCardList from "../Topics/TopicCardList";
import ScrollRightIcon from "../../Assets/Icons/ScrollRightIcon";
import ScrollLeftIcon from "../../Assets/Icons/ScrollLeftIcon";

//Importing mock data until I understand how im going to make this work
import topic_data from "../../MockData/topicMockData";

// The segment is in control of the title and taking in the card categories
const Segment = ({ title }) => {
  let scrl = useRef(null);
  const [topiccards, setTopicCard] = useState(topic_data);
  const [scrollX, setscrollX] = useState(0);
  const [scrollEnd, setscrollEnd] = useState(false);
  const [hover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  //Slide click
  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrollEnd(true);
    } else {
      setscrollEnd(false);
    }
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
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
        <div className={styles.segmentCards} ref={scrl} onScroll={scrollCheck}>
          <TopicCardList topiccards={topiccards} />
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
