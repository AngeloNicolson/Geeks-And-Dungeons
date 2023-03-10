import React, { useState, useRef } from "react";
import TopicCard from "./TopicCard";

export default function TopicCardList({ topiccards }) {
  let scrl = useRef(null);
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
      <div className="card-grid" ref={scrl} onScroll={scrollCheck}>
        {topiccards.map((topicCard) => {
          return <TopicCard topicCard={topicCard} key={topicCard.topic_id} />;
        })}
      </div>
      //right
      {!scrolEnd && (
        <button className="next" onClick={() => slide(+500)}>
          <i className="fa fa-angle-right"></i>
        </button>
      )}
    </div>
  );
}
