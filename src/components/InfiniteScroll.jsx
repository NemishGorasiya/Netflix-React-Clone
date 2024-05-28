import { useCallback, useRef } from "react";
import Loader from "./Loader";
import "./InfiniteScroll.scss";
import PropTypes from "prop-types";

const InfiniteScroll = ({
  items,
  renderItem,
  fetchMoreData,
  mediaType,
  isLoading,
  removeFromList,
  listType,
}) => {
  const observer = useRef();

  const lastUserRef = useCallback(
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
        <div ref={items.length === index + 1 ? lastUserRef : null} key={index}>
          {renderItem({
            ...item,
            mediaType,
            removeFromList,
            listType,
          })}
        </div>
      ))}
      {isLoading && (
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
  mediaType: PropTypes.string,
  isLoading: PropTypes.bool,
  removeFromList: PropTypes.func,
  listType: PropTypes.string,
};

export default InfiniteScroll;
