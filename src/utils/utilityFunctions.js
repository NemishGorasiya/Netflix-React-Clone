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
  return title.replace("_", " ");
};
