/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useEffect, useRef, useState } from "react";
import "./Slider.scss";
import { Link, useSearchParams } from "react-router-dom";
import posterFallBackImage from "../../assets/posterNotFound.jpg";
import {
	getImagePath,
	handleFallBackImage,
} from "../../utils/utilityFunctions";
import PropTypes from "prop-types";
import RenderIfVisible from "react-render-if-visible";
import {
	fetchMediaData,
	fetchMoreInfoOfMedia,
	fetchWatchList,
} from "../../services/services";
import useLocalStorage from "../../hooks/useLocalStorage";
import Loader from "../Loader";
import Skeleton from "react-loading-skeleton";

const Slider = ({
	categoryTitle,
	seriesId,
	mediaType,
	isSeasonList = false,
	listType,
	isExpanded = false,
}) => {
	const [searchParams] = useSearchParams();
	const mediaId = searchParams.get("id");
	const sliderRef = useRef();
	const [loggedInUser] = useLocalStorage("loggedInUser", null);
	const { sessionID } = loggedInUser;

	const [media, setMedia] = useState({
		list: [],
		isLoading: true,
	});
	const { list: mediaList, isLoading: isMediaLoading } = media;

	const [sliderButtons, setSliderButtons] = useState({
		prevBtn: false,
		nextBtn: true,
	});
	const { prevBtn, nextBtn } = sliderButtons;

	const handleSliderBtnVisibility = useCallback((scrollLeft) => {
		const scrollWidth = sliderRef.current.scrollWidth;
		const clientWidth = sliderRef.current.clientWidth;

		setSliderButtons((prevState) => ({
			...prevState,
			prevBtn: scrollLeft > 0,
			nextBtn: scrollLeft + clientWidth < scrollWidth,
		}));
	}, []);

	const onPrevBtnClick = () => {
		const scrollLeft =
			sliderRef.current.scrollLeft - sliderRef.current.clientWidth;
		sliderRef.current.scrollLeft -= sliderRef.current.clientWidth + 15;
		handleSliderBtnVisibility(scrollLeft);
	};
	const onNextBtnClick = () => {
		const scrollLeft =
			sliderRef.current.scrollLeft + sliderRef.current.clientWidth;
		sliderRef.current.scrollLeft += sliderRef.current.clientWidth + 15;
		console.log("sl", sliderRef.current.clientWidth);
		handleSliderBtnVisibility(scrollLeft);
	};

	let startX;
	let endX;
	const onTouchStart = (event) => {
		startX = event.changedTouches[0].clientX;
	};
	const onTouchEnd = (event) => {
		endX = event.changedTouches[0].clientX;
		if (startX - endX > 50) {
			onNextBtnClick();
		} else if (startX - endX < -50) {
			onPrevBtnClick();
		}
	};
	const onDragStart = (event) => {
		startX = event.clientX;
	};
	const onDragEnd = (event) => {
		endX = event.clientX;
		if (startX - endX > 50) {
			onNextBtnClick();
		} else if (startX - endX < -50) {
			onPrevBtnClick();
		}
	};

	// useEffect(() => {
	//   if (isViewAll === false) {
	//     scrollLeft = sliderRef.current.scrollLeft;
	//     handleSliderBtnVisibility(scrollLeft);
	//   }
	// }, [isViewAll]);

	const fetchMedia = async () => {
		try {
			let res;
			if (isSeasonList) {
				res = await fetchMoreInfoOfMedia({
					mediaId,
					mediaType,
				});
			} else {
				res = await fetchMediaData({
					mediaType,
					mediaCategory: categoryTitle,
				});
			}
			switch (listType) {
				case "seasonList":
					res = await fetchMoreInfoOfMedia({
						mediaId,
						mediaType,
					});
					break;
				case "watchlist":
					res = await fetchWatchList({
						sessionID,
						mediaType,
					});
					break;
				case "favoriteList":
					res = await fetchMoreInfoOfMedia({
						mediaId,
						mediaType,
					});
					break;
				default:
					break;
			}

			const { results, seasons } = res;
			setMedia({
				list: results || seasons,
				isLoading: false,
			});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchMedia();
	}, []);

	console.log("isExa", isExpanded);

	return isMediaLoading ? (
		<div className="slider">
			<div className="slideContainer">
				{Array(9)
					.fill()
					.map((_item, index) => (
						<div
							key={index}
							className="renderIfVisible"
							style={{ display: "flex" }}
						>
							<div className="slide">
								<Skeleton
									style={{
										position: "absolute",
										height: "100%",
										width: "100%",
									}}
								/>
							</div>
						</div>
					))}
			</div>
		</div>
	) : (
		<div className="slider">
			{prevBtn && (
				<button className="sliderBtn prevBtn" onClick={onPrevBtnClick}>
					<i className="fa-solid fa-chevron-left"></i>
				</button>
			)}
			{nextBtn && (
				<button className="sliderBtn nextBtn" onClick={onNextBtnClick}>
					<i className="fa-solid fa-chevron-right"></i>
				</button>
			)}

			<div
				onTouchStart={onTouchStart}
				onTouchEnd={onTouchEnd}
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				ref={sliderRef}
				className={`slideContainer ${isExpanded ? "expanded" : ""}`}
			>
				{mediaList.map(({ id, season_number, poster_path }) => (
					<RenderIfVisible key={id} stayRendered={true}>
						<div key={id} className="slide">
							<Link
								to={`/${mediaType}/moreInfo?id=${
									isSeasonList ? seriesId : id ?? mediaId
								}${season_number ? `&season=${season_number}` : ""}`}
							>
								<img
									src={
										poster_path
											? getImagePath(poster_path)
											: posterFallBackImage
									}
									alt="image"
									loading="lazy"
									decoding="async"
									onError={(event) => {
										handleFallBackImage(event, posterFallBackImage);
									}}
								/>
							</Link>
						</div>
					</RenderIfVisible>
				))}
			</div>
		</div>
	);
};

Slider.propTypes = {
	categoryTitle: PropTypes.string,
	seriesId: PropTypes.string,
	mediaType: PropTypes.string,
	isSeasonList: PropTypes.bool,
	listType: PropTypes.string,
};

const SliderComponent = memo(Slider);

export default SliderComponent;
