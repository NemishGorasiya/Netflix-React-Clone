import React from "react";
import { moreReasonsToJoin } from "../data/data.js";

export default function MoreReasonSection() {
  return (
    <div className="heroPageSection morereasonsToJoinSection">
      <h3 className="sectionHeading">More reasons to join</h3>
      <div className="cardsContainer">
        {moreReasonsToJoin.map((reason, idx) => (
          <div key={idx} className="card">
            <h2>{reason.title}</h2>
            <p>{reason.description}</p>
            <div
              className="moreReasonImage"
              dangerouslySetInnerHTML={{ __html: reason.image }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
