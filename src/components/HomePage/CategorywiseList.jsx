import { useState } from "react";
import "./CategorywiseList.scss";
import Slider from "./Slider";

const CategorywiseList = () => {
  const [isViewAll, setIsViewAll] = useState(false);
  const handleViewAllClick = () => {
    setIsViewAll((prev) => !prev);
  };
  return (
    <div className="categoryWiseList">
      <div className="categoryHeader">
        <h3 className="categoryHeading">South Indian Cinemas</h3>
        <p className="viewAll" onClick={handleViewAllClick}>
          View {isViewAll ? "Less" : "More"}
        </p>
      </div>
      <Slider isViewAll={isViewAll} />
    </div>
  );
};

export default CategorywiseList;
