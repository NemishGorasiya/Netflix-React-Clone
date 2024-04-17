import { useEffect } from "react";

const InfiniteScroll = ({
  items,
  renderItem,
  fetchMoreData,
  mediaType,
  loader,
  isLoading,
}) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (scrolledToBottom) {
        fetchMoreData();
      }
    };

    if (window.scrollY === 0) {
      handleScroll();
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchMoreData]);

  return (
    <>
      {items.map((item) => renderItem({ ...item, mediaType: mediaType }))}
      {isLoading && loader}
    </>
  );
};

export default InfiniteScroll;
