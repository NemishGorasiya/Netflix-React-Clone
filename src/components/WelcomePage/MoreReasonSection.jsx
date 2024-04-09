import { moreReasonsToJoin } from "../../data/data.jsx";
export default function MoreReasonSection() {
  return (
    <div className="heroPageSection moreReasonsToJoinSection">
      <h3 className="sectionHeading">More reasons to join</h3>
      <div className="cardsContainer">
        {moreReasonsToJoin.map(({ title, description, image }, idx) => (
          <div key={idx} className="card">
            <h2>{title}</h2>
            <p>{description}</p>
            <div
              className="moreReasonImage"
              dangerouslySetInnerHTML={{ __html: image }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
