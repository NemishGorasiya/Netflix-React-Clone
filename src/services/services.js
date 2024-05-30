const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const httpReq = async ({ url, options: optionsProp }) => {
  const defaultHeaders = {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };
  const { method = "GET", headers = {}, body, signal } = optionsProp || {};
  const options = {
    method,
    headers: { ...defaultHeaders, ...headers },
    signal,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const res = await fetch(BASE_URL + url, options);

    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem("loggedInUser");
      }
      const errorData = res.json();
      throw new Error(errorData.message || "An error occurred");
    }

    return res.json();
  } catch (error) {
    console.error("HTTP request failed:", error.message);
    throw error;
  }
};

export const fetchMediaData = async ({
  mediaType,
  mediaCategory,
  pageNumber = 1,
  abortController,
}) => {
  const url = `${mediaType}/${mediaCategory}?language=en-US&page=${pageNumber}`;
  const options = { signal: abortController?.signal };
  return await httpReq({ url, options });
};

export const fetchMoreInfoOfMedia = async ({
  mediaId,
  mediaType,
  seasonNumber,
  episodeNumber,
  abortController,
}) => {
  const url = episodeNumber
    ? `${mediaType}/${mediaId}/season/${seasonNumber}/episode/${episodeNumber}?append_to_response=credits&language=en-US&page=1`
    : `${mediaType}/${mediaId}?append_to_response=credits&language=en-US&page=1`;
  const options = { signal: abortController?.signal };
  return await httpReq({ url, options });
};

export const fetchEpisodes = async ({ mediaId, mediaType, seasonNumber }) => {
  const url = `${mediaType}/${mediaId}/season/${seasonNumber}?language=en-US&page=1`;
  return await httpReq({ url });
};

const generateRequestToken = async () => {
  const url = `authentication/token/new`;
  const resJSON = await httpReq({ url });
  return resJSON.success ? resJSON.request_token : false;
};

const validateRequestTokenWithLogin = async (username, password, reqToken) => {
  const url = `authentication/token/validate_with_login`;
  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: { username, password, request_token: reqToken },
  };
  const resJSON = await httpReq({ url, options });
  return resJSON.success;
};

const generateSessionId = async (reqToken) => {
  const url = `authentication/session/new?request_token=${reqToken}`;
  const resJSON = await httpReq({ url });
  return resJSON.success ? resJSON.session_id : false;
};

export const handleTMDBLogin = async (username, password) => {
  const reqToken = await generateRequestToken();
  if (reqToken) {
    const isValidate = await validateRequestTokenWithLogin(
      username,
      password,
      reqToken
    );
    if (isValidate) {
      return await generateSessionId(reqToken);
    }
  }
  return false;
};

export const updateUserPreferencesList = async ({
  sessionID,
  mediaId,
  mediaType,
  isAdding = false,
  listType,
}) => {
  const url = `account/account_id/${listType}?session_id=${sessionID}`;
  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: { media_type: mediaType, media_id: mediaId, [listType]: isAdding },
  };
  return await httpReq({ url, options });
};

export const fetchWatchList = async ({ sessionID, mediaType }) => {
  const url = `account/account_id/watchlist/${mediaType}?language=en-US&page=1&session_id=${sessionID}&sort_by=created_at.desc`;
  return await httpReq({ url });
};

export const fetchUserPreferenceList = async ({
  sessionID,
  listType,
  mediaType = "movie",
  pageNumber = 1,
  abortController,
}) => {
  const modifiedMediaType =
    mediaType === "movie"
      ? "movies"
      : mediaType === "episodes"
      ? "tv/episodes"
      : mediaType;
  const url = `account/account_id/${listType}/${modifiedMediaType}?language=en-US&page=${pageNumber}&session_id=${sessionID}&sort_by=created_at.desc`;
  const options = { signal: abortController?.signal };
  return await httpReq({ url, options });
};

export const fetchDataBySearchQuery = async ({
  searchQuery,
  mediaType = "movie",
  pageNumber = 1,
}) => {
  const url = `search/${mediaType}?query=${searchQuery}&include_adult=false&language=en-US&page=${pageNumber}`;
  return await httpReq({ url });
};

export const submitMediaRating = async ({
  mediaType,
  rating,
  mediaId,
  sessionID,
  seasonNumber,
  episodeNumber,
  method = "POST",
}) => {
  const url = episodeNumber
    ? `${
        mediaType === "episodes" ? "tv" : mediaType
      }/${mediaId}/season/${seasonNumber}/episode/${episodeNumber}/rating?session_id=${sessionID}`
    : `${mediaType}/${mediaId}/rating?session_id=${sessionID}`;
  const options = {
    method,
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: method === "DELETE" ? null : { value: rating },
  };
  return await httpReq({ url, options });
};
