import { useCallback, useRef } from "react";
import Loader from "./Loader";
import "./InfiniteScroll.scss";
import PropTypes from "prop-types";

const InfiniteScroll = ({ items, renderItem, fetchMoreData, isLoading }) => {
	const observer = useRef();
	const observeLastItemRef = useCallback(
		(node) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					fetchMoreData();
				}
			});
			if (node) observer.current.observe(node);
		},
		[fetchMoreData, isLoading]
	);

	return (
		<>
			{items.map((item, index) => (
				<div
					ref={items.length === index + 1 ? observeLastItemRef : null}
					key={index}
				>
					{renderItem({
						...item,
					})}
				</div>
			))}
			{isLoading && items.length > 0 && (
				<div className="loaderWrapper">
					<Loader />
				</div>
			)}
		</>
	);
};

InfiniteScroll.propTypes = {
	items: PropTypes.array,
	renderItem: PropTypes.func,
	fetchMoreData: PropTypes.func,
	isLoading: PropTypes.bool,
};

export default InfiniteScroll;
