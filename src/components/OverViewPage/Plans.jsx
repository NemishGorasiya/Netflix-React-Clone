import { subscribePlans } from "../../data/data.js";
const Plans = () => {
  return (
    <div className="heroPageSection plansSection">
      <h3 className="sectionHeading">A plan to suit your needs</h3>
      <div className="cardsContainer">
        {subscribePlans.map((plan, idx) => (
          <div key={idx} className="card">
            <h2>{plan.type}</h2>
            <p>{plan.services}</p>
            <div className="bottomDiv">
              &#8377; {plan.price}/{plan.duration}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
