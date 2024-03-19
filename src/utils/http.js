export const fetchMovies = async ({ movieType }) => {
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
