import { useCallback, useRef } from "react";
import Loader from "./Loader";
import "./InfiniteScroll.scss";

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
      {items.map((item, index) =>
        items.length === index + 1 ? (
          <div ref={lastUserRef} key={index}>
            {renderItem({
              ...item,
              mediaType: mediaType,
              removeFromList: removeFromList,
              listType: listType,
            })}
          </div>
        ) : (
          <div key={index}>
            {renderItem({
              ...item,
              mediaType: mediaType,
              removeFromList: removeFromList,
              listType: listType,
            })}
          </div>
        )
      )}
      {isLoading && (
        <div className="loaderWrapper">
          <Loader />
        </div>
      )}
    </>
  );
};

export default InfiniteScroll;
