import { subscribePlans } from "../../data/data.jsx";
const Plans = () => {
  return (
    <div className="heroPageSection plansSection">
      <h3 className="sectionHeading">A plan to suit your needs</h3>
      <div className="cardsContainer">
        {subscribePlans.map(({ type, services, price, duration }, idx) => (
          <div key={idx} className="card">
            <h2>{type}</h2>
            <p>{services}</p>
            <div className="bottomDiv">
              &#8377; {price}/{duration}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
