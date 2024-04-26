import { useCallback, useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
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
  const navigate = useNavigate();

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
        if (res) {
          const { results, total_pages } = res;
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
    if (!mediaType) {
      navigate("movie");
    } else {
      const isAllowedMediaType = mediaTypes.some(
        (allowedMediaType) => allowedMediaType === mediaType
      );
      if (!isAllowedMediaType) {
        navigate("movie");
      }
    }
    const abortController = new AbortController();
    getMedia({ abortController: abortController });
    setMedia((prevMedia) => ({
      ...prevMedia,
      list: [],
      isLoading: true,
      pageNumber: 1,
      hasMore: true,
    }));
    return () => {
      abortController.abort();
    };
  }, [getMedia, mediaType, navigate]);

  return (
    <div className="userPreferences">
      <ul className="tabsWrapper">
        {mediaTypes.map((mediaType) => (
          <NavLink
            key={mediaType}
            to={`/${listType}/${mediaType}`}
            className={({ isActive }) => {
              return isActive ? "tab activeTab" : "tab";
            }}
          >
            {mediaType}
          </NavLink>
        ))}
      </ul>
      <MediaGallery
        list={mediaList}
        isLoading={isLoading}
        fetchMoreData={fetchMoreMedia}
      />
    </div>
  );
};

export default UserPreferences;
