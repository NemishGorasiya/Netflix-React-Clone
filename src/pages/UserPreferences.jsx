import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MediaGallery from "../components/MediaGallery";
import useLocalStorage from "../hooks/useLocalStorage";
import { fetchUserPreferenceList } from "../services/services";
import "./UserPreferences.scss";
const UserPreferences = ({ listType, mediaTypes }) => {
  const [media, setMedia] = useState({
    list: [],
    isLoading: true,
    pageNumber: 1,
    hasMore: true,
  });
  const {
    list: mediaList,
    isLoading,
    pageNumber,
    hasMore: hasMoreData,
  } = media;

  const { mediaType } = useParams();
  console.log("mediaType", mediaType);
  const [loggedInUser] = useLocalStorage("loggedInUser", {});
  const { sessionID } = loggedInUser;

  const getMedia = useCallback(
    async ({ pageNumber, abortController } = {}) => {
      try {
        setMedia((prevMedia) => ({ ...prevMedia, isLoading: true }));
        const res = await fetchUserPreferenceList({
          sessionID,
          listType,
          mediaType,
          pageNumber,
          abortController,
        });
        const { results, total_pages } = res;
        if (res) {
          setMedia((prevMedia) => ({
            list: [...prevMedia.list, ...results],
            isLoading: false,
            pageNumber: prevMedia.pageNumber + 1,
            hasMore: prevMedia.pageNumber < total_pages,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [listType, mediaType, sessionID]
  );

  const fetchMoreMedia = () => {
    if (hasMoreData) {
      getMedia({
        pageNumber,
      });
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    getMedia({ abortController: abortController });
    return () => {
      abortController.abort();
    };
  }, [getMedia]);

  return (
    <div className="userPreferences">
      <MediaGallery
        list={mediaList}
        isLoading={isLoading}
        fetchMoreData={fetchMoreMedia}
      />
    </div>
  );
};

export default UserPreferences;
