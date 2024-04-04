import Skeleton from "react-loading-skeleton";

const CarouselSliderSkeleton = () => {
  return (
    <div className="carouselSlide">
      <h1 className="movieTitle">
        <Skeleton height={60} width={350} />
      </h1>

      <p className="movieDescription">
        <Skeleton height={15} width={450} count={3} />
      </p>
      <div className="functionButtonsWrapper">
        <span>
          <Skeleton height={60} width={100} />
        </span>
        <Skeleton height={60} width={100} />
      </div>
    </div>
  );
};

export default CarouselSliderSkeleton;
