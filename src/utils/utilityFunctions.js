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

// export const validateEmail = (email) => {
//   const emailRegEx =
//     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//   return email.match(emailRegEx);
// };
