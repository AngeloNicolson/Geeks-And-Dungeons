import React, { useState, useRef } from "react";
import TopicCard from "./TopicCard";

export default function TopicCardList({ topiccards }) {
  return (
    <div>
      <div className="card-grid">
        {topiccards.map((topicCard) => {
          return <TopicCard topicCard={topicCard} key={topicCard.topic_id} />;
        })}
      </div>
    </div>
  );
}
