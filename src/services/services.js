const httpReq = async ({ url, options }) => {
  try {
    const res = await fetch(url, options);
    const resJSON = await res.json();
    return resJSON;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMediaData = async ({ mediaType, mediaCategory }) => {
  let url = `https://api.themoviedb.org/3/${mediaType}/${mediaCategory}?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };
  return await httpReq({ url, options });
};

export const fetchMoreInfoOfMedia = async ({
  mediaId,
  mediaType,
  isEpisode = false,
  seasonNumber,
  episodeNumber,
}) => {
  let url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}?append_to_response=credits&language=en-US&page=1`;
  if (isEpisode) {
    url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/season/${seasonNumber}/episode/${episodeNumber}?append_to_response=credits&language=en-US&page=1`;
  }
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  try {
    const res = await fetch(url, options);
    const resJSON = await res.json();

    return resJSON;
  } catch (error) {
    console.error(error);
  }
};

export const fetchEpisodes = async ({ mediaId, mediaType, seasonNumber }) => {
  let url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/season/${seasonNumber}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };
  return await httpReq({ url, options });
};

export const generateRequestToken = async () => {
  let url = `https://api.themoviedb.org/3/authentication/token/new`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };
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
https://api.themoviedb.org/3/authentication/token/validate_with_login`;

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
    body: JSON.stringify({
      username: username,
      password: password,
      request_token: reqToken,
    }),
  };
  const resJSON = await httpReq({ url, options });
  return resJSON.success;
};

export const generateSessionId = async (reqToken) => {
  let url = `https://api.themoviedb.org/3/authentication/session/new?request_token=${reqToken}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };
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
  const url = `https://api.themoviedb.org/3/account/account_id/favorite?session_id=${sessionID}`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
    body: JSON.stringify({
      media_type: media_type,
      media_id: media_id,
      favorite: isAdding,
    }),
  };

  return await httpReq({ url, options });
};

export const addToWatchList = async ({
  sessionID,
  media_id,
  media_type,
  isAdding = true,
}) => {
  const url = `https://api.themoviedb.org/3/account/account_id/watchlist?session_id=${sessionID}`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY} `,
    },
    body: JSON.stringify({
      media_type: media_type,
      media_id: media_id,
      watchlist: isAdding,
    }),
  };

  return await httpReq({ url, options });
};

export const fetchWatchList = async ({ sessionID, watchListCategory }) => {
  let url = `https://api.themoviedb.org/3/account/account_id/watchlist/${watchListCategory}?language=en-US&page=1&session_id=${sessionID}&sort_by=created_at.desc`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  return await httpReq({ url, options });
};

export const fetchFavoriteList = async ({
  sessionID,
  favoriteListCategory,
}) => {
  let url = `https://api.themoviedb.org/3/account/account_id/favorite/${favoriteListCategory}?language=en-US&page=1&session_id=${sessionID}&sort_by=created_at.desc`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  return await httpReq({ url, options });
};

export const fetchDataBySearchQuery = async ({
  searchQuery,
  media_type = "movie",
}) => {
  const url = `https://api.themoviedb.org/3/search/${media_type}?query=${searchQuery}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };
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
https://api.themoviedb.org/3/${mediaType}/${mediaId}/rating?session_id=${sessionID}`;

  if (isEpisode) {
    url = `
https://api.themoviedb.org/3/${mediaType}/${mediaId}/season/${seasonNumber}/episode/${episodeNumber}/rating?session_id=${sessionID}`;
  }
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
    body: JSON.stringify({
      value: rating,
    }),
  };
  return await httpReq({ url, options });
};

export const fetchRatedList = async ({ sessionID, category }) => {
  if (category === "episodes") {
    category = "tv/episodes";
  }
  if (category === "movie") {
    category = "movies";
  }
  const url = `https://api.themoviedb.org/3/account/account_id/rated/${category}?language=en-US&page=1&session_id=${sessionID}&sort_by=created_at.asc`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  return await httpReq({ url, options });
};
