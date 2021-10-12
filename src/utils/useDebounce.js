import { useEffect, useState, useRef } from 'react';

/**
 * Executes a function after a user stops typing for a certain milliseconds
 * @param {Function} searchHandler Function that will be executed
 * @param {Number} delay Milliseconds delay to execute the function
 */
const useDebounce = (searchHandler, delay = 1000) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const didMount = useRef(false);

  useEffect(() => {
    let debounceFn;
    // Prevent executing the function on first mount of component
    if (didMount.current) {
      // Prevent execution if query is empty or null
      if (query !== "") {
        // Execute the function if user stops typing
        debounceFn = setTimeout(() => {
          const arrayOfCities = searchHandler(query.trim());
          setResult(arrayOfCities)
        }, delay);
      } else {
        setResult([]);
      }
    } else {
      didMount.current = true;
    }
    // Clear timeout if user types again
    return () => clearTimeout(debounceFn);
  }, [query, delay, searchHandler])

  return [query, setQuery, result]
}

export default useDebounce
