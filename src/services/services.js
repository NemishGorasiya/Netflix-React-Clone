const BASE_URL = "https://api.themoviedb.org/3/";
const httpReq = async ({ url, options }) => {
  try {
    const res = await fetch(BASE_URL + url, options);
    if (res.status === 401) {
      localStorage.removeItem("loggedInUser");
      window.location.href = "/auth?mode=login";
    }
    const resJSON = await res.json();
    return resJSON;
  } catch (error) {
    console.error(error);
  }
};

const setOptions = ({ method = "GET", headers, body, signal }) => {
  const defaultHeaders = {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  };
  const options = {
    method: method,
    headers: { ...defaultHeaders, ...headers },
    signal: signal,
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  return options;
};

export const fetchMediaData = async ({
  mediaType,
  mediaCategory,
  pageNumber = 1,
  abortController,
}) => {
  let url = `${mediaType}/${mediaCategory}?language=en-US&page=${pageNumber}`;
  const options = setOptions({
    signal: abortController ? abortController.signal : null,
  });
  return await httpReq({ url, options });
};

export const fetchMoreInfoOfMedia = async ({
  mediaId,
  mediaType,
  isEpisode = false,
  seasonNumber,
  episodeNumber,
  abortController,
}) => {
  let url = `${mediaType}/${mediaId}?append_to_response=credits&language=en-US&page=1`;
  if (isEpisode) {
    url = `${mediaType}/${mediaId}/season/${seasonNumber}/episode/${episodeNumber}?append_to_response=credits&language=en-US&page=1`;
  }
  const options = setOptions({
    signal: abortController ? abortController.signal : null,
  });

  try {
    return await httpReq({ url, options });
  } catch (error) {
    console.error(error);
  }
};

export const fetchEpisodes = async ({ mediaId, mediaType, seasonNumber }) => {
  let url = `${mediaType}/${mediaId}/season/${seasonNumber}?language=en-US&page=1`;
  const options = setOptions({});
  return await httpReq({ url, options });
};

const generateRequestToken = async () => {
  let url = `authentication/token/new`;
  const options = setOptions({});
  const resJSON = await httpReq({ url, options });
  if (resJSON.success) {
    return resJSON.request_token;
  } else {
    return false;
  }
};

const validateRequestTokenWithLogin = async (username, password, reqToken) => {
  let url = `
authentication/token/validate_with_login`;

  const options = setOptions({
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: {
      username: username,
      password: password,
      request_token: reqToken,
    },
  });
  const resJSON = await httpReq({ url, options });
  return resJSON.success;
};

const generateSessionId = async (reqToken) => {
  let url = `authentication/session/new?request_token=${reqToken}`;
  const options = setOptions({});
  const resJSON = await httpReq({ url, options });
  if (resJSON.success) {
    return resJSON.session_id;
  } else {
    return false;
  }
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
      const session_id = await generateSessionId(reqToken);
      if (session_id) {
        return session_id;
      }
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
  const options = setOptions({
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: {
      media_type: mediaType,
      media_id: mediaId,
      [listType]: isAdding,
    },
  });

  return await httpReq({ url, options });
};

export const fetchWatchList = async ({ sessionID, mediaType }) => {
  let url = `account/account_id/watchlist/${mediaType}?language=en-US&page=1&session_id=${sessionID}&sort_by=created_at.desc`;
  const options = setOptions({});

  return await httpReq({ url, options });
};

// export const fetchFavoriteList = async ({
// 	sessionID,
// 	favoriteListCategory,
// }) => {
// 	let url = `account/account_id/favorite/${favoriteListCategory}?language=en-US&page=1&session_id=${sessionID}&sort_by=created_at.desc`;

// 	const options = setOptions({});
// 	return await httpReq({ url, options });
// };

export const fetchUserPreferenceList = async ({
  sessionID,
  listType,
  mediaType = "movie",
  pageNumber = 1,
  abortController,
}) => {
  let modifiedMediaType = "";
  switch (mediaType) {
    case "movie":
      modifiedMediaType = "movies";
      break;
    case "episodes":
      modifiedMediaType = "tv/episodes";
      break;
    default:
      modifiedMediaType = mediaType;
      break;
  }
  let url = `account/account_id/${listType}/${modifiedMediaType}?language=en-US&page=${pageNumber}&session_id=${sessionID}&sort_by=created_at.desc`;
  const options = setOptions({
    signal: abortController ? abortController.signal : null,
  });
  return await httpReq({ url, options });
};

export const fetchDataBySearchQuery = async ({
  searchQuery,
  mediaType = "movie",
  pageNumber = 1,
}) => {
  const url = `search/${mediaType}?query=${searchQuery}&include_adult=false&language=en-US&page=${pageNumber}`;
  const options = setOptions({});
  const res = await fetch(BASE_URL + url, options);
  const resJSON = await res.json();
  if (res.status === 200) {
    return resJSON;
  }
  return false;
};

export const submitMediaRating = async ({
  mediaType,
  rating,
  mediaId,
  sessionID,
  isEpisode = false,
  seasonNumber,
  episodeNumber,
  method = "POST",
}) => {
  let url = `
${mediaType}/${mediaId}/rating?session_id=${sessionID}`;

  if (isEpisode) {
    url = `
${
  mediaType === "episodes" ? "tv" : mediaType
}/${mediaId}/season/${seasonNumber}/episode/${episodeNumber}/rating?session_id=${sessionID}`;
  }
  const options = setOptions({
    method: method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body:
      method === "delete"
        ? null
        : {
            value: rating,
          },
  });
  return await httpReq({ url, options });
};
