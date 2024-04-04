import Skeleton from "react-loading-skeleton";
import "./CategoryWiseListSkeleton.scss";

const CategoryWiseListSkeleton = () => {
  return (
    <div className="categoryWiseList categoryWiseListSkeleton">
      <div className="categoryHeader">
        <h3 className="categoryHeading">
          <Skeleton />
        </h3>
        <p className="viewAll">
          <Skeleton height={20} width={80} />
        </p>
      </div>
      <div className="slider">
        <div className="slideContainer">
          {Array(9)
            .fill()
            .map((_item, index) => (
              <div key={index} className="renderIfVisible">
                <div className="slide">
                  <Skeleton />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseListSkeleton;
