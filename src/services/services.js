export const fetchMovies = async (movieType) => {
  let url = `https://api.themoviedb.org/3/movie/${movieType}?language=en-US&page=1`;
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
    // console.log(resJSON);
    return resJSON;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMoreInfoOdMovie = async ({ movieId }) => {
  let url = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits&language=en-US&page=1`;
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

    // console.log(resJSON);
    return resJSON;
  } catch (error) {
    console.error(error);
  }
};

export const generateRequestToken = async (username, password) => {
  let url = `https://api.themoviedb.org/3/authentication/token/new`;
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
    if (resJSON.success) {
      return resJSON.request_token;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
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
  try {
    const res = await fetch(url, options);
    const resJSON = await res.json();
    return resJSON.success;
  } catch (error) {
    console.error(error);
  }
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
  try {
    const res = await fetch(url, options);
    const resJSON = await res.json();
    if (resJSON.success) {
      return resJSON.session_id;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
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
