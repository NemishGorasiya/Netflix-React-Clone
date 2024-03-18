import { useRef } from "react";
import "./Slider.scss";
const Slider = ({ isViewAll }) => {
  const sliderRef = useRef();
  const handlePrevBtnClick = () => {
    console.log("called");
    const calcToScroll = (sliderRef.current.clientWidth - 60) / 9;
    sliderRef.current.scrollLeft -=
      sliderRef.current.clientWidth - calcToScroll;
  };
  const handleNextBtnClick = () => {
    console.log("called");
    const calcToScroll = (sliderRef.current.clientWidth - 60) / 9;
    sliderRef.current.scrollLeft +=
      sliderRef.current.clientWidth - calcToScroll;
  };
  let startX;
  let endX;
  const handleDragStart = (event) => {
    console.log(event);
    startX = event.clientX;
  };
  const handleDragEnd = (event) => {
    endX = event.clientX;
    if (startX - endX > 50) {
      handleNextBtnClick();
    } else if (startX - endX < -50) {
      handlePrevBtnClick();
    }
  };

  return (
    <div className={isViewAll ? "slider viewAll" : "slider"}>
      {!isViewAll && (
        <>
          <button className="sliderBtn prevBtn" onClick={handlePrevBtnClick}>
            &lt;
          </button>
          <button className="sliderBtn nextBtn" onClick={handleNextBtnClick}>
            &gt;
          </button>
        </>
      )}

      <div
        className="slideContainer"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        ref={sliderRef}
      >
        <div className="slide">
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
        <div className="slide">
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
        <div className="slide">
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
        <div className="slide">
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
        <div className="slide">
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
        <div className="slide">
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
        <div className="slide">
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
        <div className="slide">
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
        <div className="slide">
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
        <div className="slide">
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
        <div className="slide">
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
        <div className="slide">
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
        <div className="slide">
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
        <div className="slide">
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
        <div className="slide">
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
        <div className="slide">
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
        <div className="slide">
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
        <div className="slide">
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
