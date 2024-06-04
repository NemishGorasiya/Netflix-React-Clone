import { useCallback, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import Button from "../components/common/Button";
import TvSeasonsWrapper from "../components/MoreInfoPage/TvSeasonsWrapper";
import MovieCasts from "../components/MoreInfoPage/MovieCasts";
import {
	fetchMoreInfoOfMedia,
	updateUserPreferencesList,
} from "../services/services";
import { AuthContext } from "../context/AuthContext";
import { formatDate, getImagePath } from "../utils/utilityFunctions";
import "./MoreInfoAboutMoviePage.scss";
import fallbackPoster from "../assets/fallbackPoster.png";
import RatingSection from "../components/MoreInfoPage/RatingSection";
import Loader from "../components/common/Loader";

const MoreInfoAboutMoviePage = ({ mediaType }) => {
	const { loggedInUser } = useContext(AuthContext);
	const { sessionID } = loggedInUser;

	const [moreInfoOfMedia, setMoreInfoOfMedia] = useState({
		data: {},
		isLoading: true,
	});

	const { data, isLoading } = moreInfoOfMedia;

	const [userPreferenceStatus, setUserPreferenceStatus] = useState({
		watchlist: { isAdded: false, isLoading: false },
		favorite: { isAdded: false, isLoading: false },
	});

	// If isUpdatingWatchListLoading or isUpdatingFavoriteLoading is true, then relevant button should be disabled
	const {
		watchlist: {
			isAdded: isAddedToWatchList,
			isLoading: isUpdatingWatchListLoading,
		},
		favorite: {
			isAdded: isAddedToFavorite,
			isLoading: isUpdatingFavoriteLoading,
		},
	} = userPreferenceStatus;

	const [searchParams] = useSearchParams();
	const mediaId = searchParams.get("id");
	const seasonNumber = searchParams.get("season");
	const episodeNumber = searchParams.get("episode");

	const fetchMovieData = useCallback(
		async ({ abortController } = {}) => {
			try {
				const response = await fetchMoreInfoOfMedia({
					mediaId,
					mediaType,
					seasonNumber,
					episodeNumber,
					abortController,
				});
				setMoreInfoOfMedia({
					data: response,
					isLoading: false,
				});
			} catch (error) {
				console.error(error);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[episodeNumber, mediaId, mediaType]
	);

	// UserPreferencesList like watchList and favoriteList
	const addToUserPreferencesList = async ({ listType }) => {
		try {
			const isAdding = !userPreferenceStatus[listType].isAdded;

			setUserPreferenceStatus((prevStatus) => ({
				...prevStatus,
				[listType]: {
					...prevStatus[listType],
					isLoading: true,
				},
			}));

			const res = await updateUserPreferencesList({
				sessionID,
				mediaId,
				isAdding,
				mediaType,
				listType,
			});

			if (res.success) {
				toast.success(
					`The ${mediaType} ${
						isAdding ? "Added into" : "Removed from"
					} your ${listType} successfully.`
				);
				setUserPreferenceStatus((prevStatus) => ({
					...prevStatus,
					[listType]: {
						...prevStatus[listType],
						isAdded: !prevStatus[listType].isAdded,
					},
				}));
			} else {
				toast.error(res.status_message);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setUserPreferenceStatus((prevStatus) => ({
				...prevStatus,
				[listType]: {
					...prevStatus[listType],
					isLoading: false,
				},
			}));
		}
	};

	useEffect(() => {
		const abortController = new AbortController();
		fetchMovieData({ abortController: abortController });
		return () => {
			abortController.abort();
		};
	}, [fetchMovieData]);

	const {
		credits,
		seasons,
		vote_count,
		vote_average,
		overview,
		genres,
		release_date,
		first_air_date,
		name,
		title,
		still_path,
		poster_path,
		backdrop_path,
		runtime,
		number_of_episodes,
		number_of_seasons,
		air_date,
	} = data || {};

	const runTimeHours = parseInt(runtime / 60);
	const runTimeMinutes = runtime - runTimeHours * 60;

	return isLoading ? (
		<Loader atCenter />
	) : (
		<div className="moreInfoPage">
			<div
				className="moviePoster"
				style={{
					background: `linear-gradient(to right,black 0% ,transparent 100%) , url(${
						backdrop_path || poster_path || still_path
							? getImagePath(backdrop_path || poster_path || still_path)
							: fallbackPoster
					})`,
				}}
			>
				<h1 className="movieTitle">{title || name}</h1>
			</div>
			<div className="movieDetailsWrapper">
				<div className="functionBtns">
					<div className="leftBtns">
						<Button
							className={"btn playBtn"}
							iconClassName={"fa-solid fa-play"}
							text={"Play"}
						/>
					</div>
					<div className="rightBtns">
						{!episodeNumber && (
							<>
								<Button
									className="btn"
									iconClassName={`fa-regular fa-bookmark ${
										isAddedToWatchList && "fa-solid"
									}`}
									text={"WatchList"}
									disabled={isUpdatingWatchListLoading}
									onClick={() => {
										addToUserPreferencesList({ listType: "watchlist" });
									}}
								/>
								<Button
									className="btn"
									iconClassName={`fa-regular fa-thumbs-up ${
										isAddedToFavorite && "fa-solid"
									}`}
									disabled={isUpdatingFavoriteLoading}
									text={"Favorite"}
									onClick={() => {
										addToUserPreferencesList({ listType: "favorite" });
									}}
								/>
							</>
						)}
					</div>
				</div>
				<div className="aboutMovie">
					<p className="movieDetails">
						<span className="releaseYear">
							{release_date || first_air_date || air_date
								? formatDate(release_date || first_air_date || air_date)
								: ""}
						</span>
						{runtime && (
							<span className="movieLength">
								{"| "} {runTimeHours}h {runTimeMinutes}m
							</span>
						)}
						<span className="movieVideoQuality">HD</span>
					</p>
					<p className="movieDetails">
						{number_of_seasons && (
							<span className="movieLength">
								{number_of_seasons} Seasons &nbsp;{" "}
								{number_of_seasons && number_of_episodes && "•"}
							</span>
						)}
						{number_of_episodes && (
							<span className="releaseYear">{number_of_episodes} Episodes</span>
						)}
					</p>
					{genres && (
						<p className="movieGenres">
							{genres.map((genre, idx) => (
								<span key={genre.id}>
									{genre.name} {idx === genres.length - 1 ? "" : "| "}
								</span>
							))}
						</p>
					)}
					<div className="movieDescription">{overview}</div>
					<RatingSection
						vote_average={vote_average}
						vote_count={vote_count}
						title={title}
						name={name}
						mediaType={mediaType}
						episodeNumber={episodeNumber}
						seasonNumber={seasonNumber}
						mediaId={mediaId}
					/>
				</div>
				{mediaType === "tv" && !!seasons && (
					<TvSeasonsWrapper mediaId={mediaId} seasons={seasons} />
				)}
				{credits?.cast?.length && <MovieCasts castsInfo={credits.cast} />}
			</div>
		</div>
	);
};

MoreInfoAboutMoviePage.propTypes = {
	mediaType: PropTypes.string.isRequired,
};

export default MoreInfoAboutMoviePage;
