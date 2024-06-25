import { MEDIA_TYPES } from "../constants/constants";

export const debounce = (func, delay = 500) => {
  let timer;
  const debouncedFunction = (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };

  debouncedFunction.cancel = () => {
    clearTimeout(timer);
  };

  return debouncedFunction;
};

export const getMediaType = (path) => {
  if (path === "/home" || path === "/movies") {
    return MEDIA_TYPES.MOVIE;
  }
  return MEDIA_TYPES.TV;
};

export const handleFallBackImage = (event, fallBackImage) => {
  event.target.src = fallBackImage;
};

export const formatTitle = (title) => {
  return title.replaceAll("_", " ");
};

export const getImagePath = (relativePath) => {
  return `https://image.tmdb.org/t/p/original/${relativePath}`;
};

export const formatDate = (date) => {
  if (!date) {
    return "";
  }
  const dateToFormat = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(dateToFormat);
  return formattedDate;
};
