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
