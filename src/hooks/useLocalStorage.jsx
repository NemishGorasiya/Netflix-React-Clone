import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const storedValue =
    typeof window !== "undefined" ? localStorage.getItem(key) : null;
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [localStorageValue, setLocalStorageValue] = useState(initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(localStorageValue));
  }, [key, localStorageValue]);

  return [localStorageValue, setLocalStorageValue];
};

export default useLocalStorage;
