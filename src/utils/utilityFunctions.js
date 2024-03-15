export function debounce(func, delay = 500) {
  let timer;
  console.log("called");
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
