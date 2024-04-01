import Skeleton from "react-loading-skeleton";

const CategorywiseListSkeleton = () => {
  return (
    <div className="categoryWiseList">
      <div className="categoryHeader">
        <h3 className="categoryHeading">
          <Skeleton height={50} width={250} />
        </h3>
        <p className="viewAll">
          <Skeleton height={20} width={80} />
        </p>
      </div>
      <div className="slider">
        <div className="slideContainer">
          {Array(9)
            .fill()
            .map((item, index) => (
              <div key={index} className="renderIfVisible">
                <div className="slide">
                  <Skeleton
                    style={{
                      height: "100%",
                      width: "100%",
                      position: "absolute",
                      top: "0",
                      left: "0",
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategorywiseListSkeleton;
