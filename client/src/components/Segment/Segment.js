import React, { useState, useRef } from "react";

import styles from "./Segment.module.css";
import TopicCardList from "../Topics/TopicCardList";

//Importing mock data until I understand how im going to make this work
import topic_data from "../../MockData/topicMockData";

// The segment is in control of the title and taking in the card categories
const Segment = ({ title }) => {
  let scrl = useRef(null);
  const [topiccards, setTopicCard] = useState(topic_data);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  //Slide click
  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };
  return (
    <div>
      //Left
      {scrollX !== 0 && (
        <button className="prev" onClick={() => slide(-500)}>
          <i className="fa fa-angle-left"></i>
        </button>
      )}
      <p className={styles.title}>{title}</p>
      <div className={styles.segment} ref={scrl} onScroll={scrollCheck}>
        <TopicCardList topiccards={topiccards} />
      </div>
      //right
      {!scrolEnd && (
        <button className="next" onClick={() => slide(+500)}>
          <i className="fa fa-angle-right"></i>
        </button>
      )}
    </div>
  );
};

export default Segment;
