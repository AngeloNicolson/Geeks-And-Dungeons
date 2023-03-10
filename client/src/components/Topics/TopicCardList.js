import React from "react";
import TopicCard from "./TopicCard";

export default function TopicCardList({ topiccards }) {
  return (
    <div className="card-grid">
      {topiccards.map((topicCard) => {
        return <TopicCard topicCard={topicCard} key={topicCard.topic_id} />;
      })}
    </div>
  );
}
