import Skeleton from "react-loading-skeleton";

const CurrentlyPlayingContentSkeleton = () => {
  return (
    <div className="currentlyPlayingContent">
      <h1 className="movieTitle">
        <Skeleton height={60} width={350} />
      </h1>

      <p className="movieDesctiption">
        <Skeleton height={15} width={450} count={3} />
      </p>
      <div className="playBtnsWrapper">
        <span style={{ marginRight: "8px" }}>
          <Skeleton height={60} width={100} />
        </span>
        <Skeleton height={60} width={100} />

        {/* &nbsp;&nbsp;&nbsp;&nbsp;
        <Skeleton height={50} width={100} /> */}
        {/* <Button
          className={"btn playBtn"}
          iconClassName={"fa-solid fa-play"}
          text={"Play"}
          style={{ marginRight: "10px" }}
        />
        <Link to={`/${mediaType}/moreInfo?id=${displayMovie.id}`}>
          <Button
            className={"btn moreInfoBtn"}
            iconClassName={"fa-solid fa-circle-info"}
            text={"More Info"}
          />
        </Link> */}
      </div>
      {/* <div className="filmCertification">
        <div className="imgWrapper">
          <img src={repeat} alt="roundImage" />
        </div>
        <div className="certification">U/A 13+</div>
      </div> */}
    </div>
  );
};

export default CurrentlyPlayingContentSkeleton;
