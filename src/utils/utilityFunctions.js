export function debounce(func, delay = 500) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const handleFallBackImage = (event, fallBackImage) => {
  event.target.src = fallBackImage;
};

export const changeFormatOfTitle = (title) => {
  return title.replaceAll("_", " ");
};

export const getImagePath = (relativePath) => {
  return `https://image.tmdb.org/t/p/original/${relativePath}`;
};

export const localStorage = {
  set: (key, value) =>
    localStorage.setItem(key, value ? JSON.stringify(value) : null),
  get: (key) => JSON.parse(localStorage.getItem(key)) ?? null,
  remove: (key) => localStorage.removeItem(key),
};

export const getYear = (date) => {
  const d = new Date(date);
  return d.getFullYear();
};

export const formatDate = (date) => {
  if (date === "" || date === undefined) {
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
