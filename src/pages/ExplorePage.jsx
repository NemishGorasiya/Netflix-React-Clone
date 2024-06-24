import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import No_Movie_Found from "../assets/No_Movie_Found.png";
import posterFallBackImage from "../assets/posterNotFound.jpg";
import InfiniteScroll from "../components/common/InfiniteScroll.jsx";
import {
	fetchDataBySearchQuery,
	fetchMediaData,
} from "../services/services.js";
import {
	debounce,
	getImagePath,
	handleFallBackImage,
} from "../utils/utilityFunctions.js";
import "./ExplorePage.scss";
import CustomInput from "../components/common/CustomInput.jsx";
import {
	MEDIA_TYPES,
	movieCategories,
	tvShowsCategories,
} from "../constants/constants.js";

const ExplorePage = () => {
	const [movies, setMovies] = useState({
		list: [],
		pageNumber: 1,
		isLoading: false,
		hasMore: true,
	});
	const {
		list: movieList,
		pageNumber,
		isLoading,
		hasMore: hasMoreData,
	} = movies;
	const [selectedMediaType, setSelectedMediaType] = useState(MEDIA_TYPES.MOVIE);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const searchParamMediaType =
		searchParams.get("mediaType") || MEDIA_TYPES.MOVIE;

	const renderItem = ({ id, poster_path }) => (
		<Link key={id} to={`/${searchParamMediaType}/moreInfo?id=${id}`}>
			<div className="movieCard">
				<img
					className="posterImage"
					src={poster_path ? getImagePath(poster_path) : posterFallBackImage}
					alt={`${searchParamMediaType} poster`}
					onError={(event) => {
						handleFallBackImage(event, posterFallBackImage);
					}}
				/>
			</div>
		</Link>
	);

	const fetchData = useCallback(
		async ({ pageNumber, signal }) => {
			try {
				setMovies((prevMovies) => ({ ...prevMovies, isLoading: true }));
				let res;
				const mediaTypeParam = searchParams.get("mediaType");
				const mediaCategoryParam = searchParams.get("category");
				const searchParam = searchParams.get("search");

				if (searchParam) {
					res = await fetchDataBySearchQuery({
						searchQuery: searchParam,
						mediaType: mediaTypeParam,
						pageNumber,
					});
				} else if (mediaCategoryParam) {
					res = await fetchMediaData({
						mediaType: mediaTypeParam,
						mediaCategory: mediaCategoryParam,
						pageNumber,
						signal,
					});
				}
				if (res) {
					const { results, total_pages } = res;
					setMovies((prevMovies) => ({
						list: [...prevMovies.list, ...results],
						hasMore: prevMovies.pageNumber < total_pages,
						isLoading: false,
						pageNumber: prevMovies.pageNumber + 1,
					}));
				} else {
					setMovies((prevMovies) => ({
						...prevMovies,
						list: [],
						isLoading: false,
					}));
				}
			} catch (error) {
				console.error(error);
			}
		},
		[searchParams]
	);

	const fetchMoreData = useCallback(() => {
		if (hasMoreData) {
			fetchData({ pageNumber });
		}
	}, [hasMoreData, fetchData, pageNumber]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleDebounce = useCallback(
		debounce((value) => {
			const newSearchParams = new URLSearchParams();
			newSearchParams.set("search", value);
			newSearchParams.set("mediaType", selectedMediaType);
			setSearchParams(newSearchParams);
		}, 1000),
		[fetchData]
	);

	const handleInputChange = useCallback(
		({ target: { value } }) => {
			setSearchQuery(value);
			if (value === "") {
				handleDebounce.cancel();
				const newSearchParams = new URLSearchParams();
				newSearchParams.set("search", value);
				newSearchParams.set("mediaType", selectedMediaType);
				setSearchParams(newSearchParams);
			} else {
				handleDebounce(value);
			}
		},
		[handleDebounce, selectedMediaType, setSearchParams]
	);

	const handleSelectMediaTypeChange = ({ target: { value } }) => {
		setSelectedMediaType(value);
		const isValidCategory = (value === MEDIA_TYPES.MOVIE
			? movieCategories
			: tvShowsCategories
		).some((category) => category.value === selectedCategory);
		setSearchParams((searchParams) => {
			searchParams.set("mediaType", value);
			if (!isValidCategory) {
				searchParams.delete("category");
			}
			return searchParams;
		});
	};

	const handleCategorySelect = ({ target: { value } }) => {
		setSelectedCategory(value);
		setSearchParams((searchParams) => {
			if (value) {
				searchParams.set("category", value);
			} else {
				searchParams.delete("category");
			}
			return searchParams;
		});
	};

	useEffect(() => {
		const abortController = new AbortController();
		fetchData({ signal: abortController.signal });
		setMovies({
			list: [],
			pageNumber: 1,
			isLoading: false,
			hasMore: true,
		});
		return () => {
			abortController.abort();
		};
	}, [fetchData]);

	return (
		<div className="explorePage">
			<div className="explorePageContentWrapper">
				<div className="stickyContent">
					<div className="filterOptionsContainer">
						<div className="mediaTypeSelectContainer">
							Search In
							<div className="radioInputWrapper">
								<input
									type="radio"
									value={MEDIA_TYPES.MOVIE}
									name="mediaType"
									id={MEDIA_TYPES.MOVIE}
									checked={searchParamMediaType === MEDIA_TYPES.MOVIE}
									onChange={handleSelectMediaTypeChange}
								/>
								<label htmlFor={MEDIA_TYPES.MOVIE}>Movies</label>
							</div>
							<div className="radioInputWrapper">
								<input
									type="radio"
									value={MEDIA_TYPES.TV}
									name="mediaType"
									id={MEDIA_TYPES.TV}
									checked={searchParamMediaType === MEDIA_TYPES.TV}
									onChange={handleSelectMediaTypeChange}
								/>
								<label htmlFor={MEDIA_TYPES.TV}>TVs</label>
							</div>
						</div>
						<select
							disabled={searchParams.get("search")}
							onChange={handleCategorySelect}
							className="selectCategory"
						>
							<option value="" />
							{(searchParamMediaType === MEDIA_TYPES.MOVIE
								? movieCategories
								: tvShowsCategories
							).map((category) => (
								<option
									key={category.value}
									value={category.value}
									selected={searchParams.get("category") === category.value}
								>
									{category.label}
								</option>
							))}
						</select>
					</div>
					<CustomInput
						type="search"
						id="search"
						floatingLabel="Search here.."
						onChange={handleInputChange}
						value={searchQuery}
					/>
				</div>

				<div className="moviesGalleryWrapper">
					<InfiniteScroll
						items={movieList}
						fetchMoreData={fetchMoreData}
						renderItem={renderItem}
						// mediaType={searchParamMediaType}
						isLoading={isLoading}
					/>
				</div>

				{!isLoading && movieList?.length === 0 && (
					<div className="fallBackText">
						<img src={No_Movie_Found} alt="No movie found image" />
						<h1>No Relevant Media Found </h1>
						<p>Try to search something else... </p>
					</div>
				)}
			</div>
		</div>
	);
};

export default ExplorePage;
