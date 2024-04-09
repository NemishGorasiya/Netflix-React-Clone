const httpReq = async ({ url, options }) => {
  const BASE_URL = "https://api.themoviedb.org/3/";
  try {
    const res = await fetch(BASE_URL + url, options);
    const resJSON = await res.json();
    return resJSON;
  } catch (error) {
    console.error(error);
  }
};

const setOptions = ({ method = "GET", headers, body }) => {
  const defaultHeaders = {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  };
  const options = {
    method: method,
    headers: { ...defaultHeaders, ...headers },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  return options;
};

export const fetchMediaData = async ({ mediaType, mediaCategory }) => {
  let url = `${mediaType}/${mediaCategory}?language=en-US&page=1`;
  const options = setOptions({});
  return await httpReq({ url, options });
};

export const fetchMoreInfoOfMedia = async ({
  mediaId,
  mediaType,
  isEpisode = false,
  seasonNumber,
  episodeNumber,
}) => {
  let url = `${mediaType}/${mediaId}?append_to_response=credits&language=en-US&page=1`;
  if (isEpisode) {
    url = `${mediaType}/${mediaId}/season/${seasonNumber}/episode/${episodeNumber}?append_to_response=credits&language=en-US&page=1`;
  }
  const options = setOptions({});

  try {
    const res = await fetch(url, options);
    const resJSON = await res.json();

    return resJSON;
  } catch (error) {
    console.error(error);
  }
};

export const fetchEpisodes = async ({ mediaId, mediaType, seasonNumber }) => {
  let url = `${mediaType}/${mediaId}/season/${seasonNumber}?language=en-US`;
  const options = setOptions({});
  return await httpReq({ url, options });
};

export const generateRequestToken = async () => {
  let url = `authentication/token/new`;
  const options = setOptions({});
  const resJSON = await httpReq({ url, options });
  if (resJSON.success) {
    return resJSON.request_token;
  } else {
    return false;
  }
};

export const validateRequestTokenWithLogin = async (
  username,
  password,
  reqToken
) => {
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

export const generateSessionId = async (reqToken) => {
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

export const addToFavorite = async ({
  sessionID,
  media_id,
  media_type,
  isAdding = true,
}) => {
  const url = `account/account_id/favorite?session_id=${sessionID}`;
  const options = setOptions({
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: {
      media_type: media_type,
      media_id: media_id,
      favorite: isAdding,
    },
  });

  return await httpReq({ url, options });
};

export const addToWatchList = async ({
  sessionID,
  media_id,
  media_type,
  isAdding = true,
}) => {
  const url = `account/account_id/watchlist?session_id=${sessionID}`;
  const options = setOptions({
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: {
      media_type: media_type,
      media_id: media_id,
      watchlist: isAdding,
    },
  });

  return await httpReq({ url, options });
};

export const fetchWatchList = async ({ sessionID, watchListCategory }) => {
  let url = `account/account_id/watchlist/${watchListCategory}?language=en-US&page=1&session_id=${sessionID}&sort_by=created_at.desc`;
  const options = setOptions({});

  return await httpReq({ url, options });
};

export const fetchFavoriteList = async ({
  sessionID,
  favoriteListCategory,
}) => {
  let url = `account/account_id/favorite/${favoriteListCategory}?language=en-US&page=1&session_id=${sessionID}&sort_by=created_at.desc`;

  const options = setOptions({});
  return await httpReq({ url, options });
};

export const fetchDataBySearchQuery = async ({
  searchQuery,
  media_type = "movie",
}) => {
  const url = `search/${media_type}?query=${searchQuery}&include_adult=false&language=en-US&page=1`;
  const options = setOptions({});
  const res = await fetch(url, options);
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
}) => {
  let url = `
${mediaType}/${mediaId}/rating?session_id=${sessionID}`;

  if (isEpisode) {
    url = `
${mediaType}/${mediaId}/season/${seasonNumber}/episode/${episodeNumber}/rating?session_id=${sessionID}`;
  }
  const options = setOptions({
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: {
      value: rating,
    },
  });
  return await httpReq({ url, options });
};

export const fetchRatedList = async ({ sessionID, category }) => {
  if (category === "episodes") {
    category = "tv/episodes";
  }
  if (category === "movie") {
    category = "movies";
  }
  const url = `account/account_id/rated/${category}?language=en-US&page=1&session_id=${sessionID}&sort_by=created_at.asc`;
  const options = setOptions({});

  return await httpReq({ url, options });
};
