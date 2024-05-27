// import { useState } from "react";

// const useLocalStorage = (key, defaultValue) => {
//   const [localStorageValue, setLocalStorageValue] = useState(() => {
//     try {
//       const value = localStorage.getItem(key);
//       if (value) {
//         return JSON.parse(value);
//       } else {
//         localStorage.setItem(key, JSON.stringify(defaultValue));
//         return defaultValue;
//       }
//     } catch (error) {
//       localStorage.setItem(key, JSON.stringify(defaultValue));
//       return defaultValue;
//     }
//   });

//   const removeFromLocalStorage = () => {
//     localStorage.removeItem(key);
//   };

//   const setLocalStorageStateValue = (valueOrFn) => {
//     let newValue;
//     if (typeof valueOrFn === "function") {
//       const fn = valueOrFn;
//       newValue = fn(localStorageValue);
//     } else {
//       newValue = valueOrFn;
//     }
//     localStorage.setItem(key, JSON.stringify(newValue));
//     setLocalStorageValue(newValue);
//   };
//   return [localStorageValue, setLocalStorageStateValue, removeFromLocalStorage];
// };

// export default useLocalStorage;

import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const storedValue =
    typeof window !== "undefined" ? localStorage.getItem(key) : null;
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [localStorageValue, setLocalStorageValue] = useState(initial);

  const removeLocalStorageValue = () => {
    localStorage.removeItem(key);
    setLocalStorageValue(null);
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(localStorageValue));
  }, [key, localStorageValue]);

  return [localStorageValue, setLocalStorageValue, removeLocalStorageValue];
};

export default useLocalStorage;
