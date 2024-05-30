import { useCallback, useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import MediaGallery from "../components/common/MediaGallery";
import { AuthContext } from "../context/AuthContext";
import {
  fetchUserPreferenceList,
  submitMediaRating,
  updateUserPreferencesList,
} from "../services/services";
import "./UserPreferences.scss";

// UserPreferences like WatchList, FavoriteList, Rated
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
  const navigate = useNavigate();

  const { loggedInUser } = useContext(AuthContext);
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

  const removeFromList = async ({
    mediaId,
    show_id,
    episode_number,
    season_number,
    mediaType,
  }) => {
    try {
      let res;
      if (listType === "rated") {
        res = await submitMediaRating({
          mediaType,
          mediaId: mediaType === "episodes" ? show_id : mediaId,
          sessionID,
          isEpisode: mediaType === "episodes",
          seasonNumber: season_number,
          episodeNumber: episode_number,
          method: "delete",
        });
      } else {
        res = await updateUserPreferencesList({
          sessionID,
          mediaId,
          mediaType,
          listType,
        });
      }

      if (res) {
        toast.success(
          `The ${mediaType} removed from your ${listType} successfully.`
        );
        setMedia((prevMedia) => ({
          ...prevMedia,
          list: prevMedia.list.filter((media) => media.id !== mediaId),
        }));
      }
    } catch (error) {
      toast.error(
        `Something went wrong while removing the item from ${listType}.`
      );
      console.error(error);
    }
  };

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
  }, [getMedia, mediaType, mediaTypes, navigate]);

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
        removeFromList={removeFromList}
        listType={listType}
        mediaType={mediaType}
      />
    </div>
  );
};

UserPreferences.propTypes = {
  listType: PropTypes.string,
  mediaTypes: PropTypes.array,
};

export default UserPreferences;
