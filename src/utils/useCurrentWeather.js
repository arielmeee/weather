import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';

/**
 * Custom hook for accessing current weather data for any location
 * @param {String} cityId The id the city you want to access weather data
 */
const useCurrentWeather = (cityId) => {
  // Memoizing initial state object so its initialization will stay the same during
  // numerous rendering throughout its lifecycle thus won't cause infinite loop to useEffect 
  const initialState = useMemo(() => ({ loading: true, success: null, failure: null }), []);
  
  // The state of the request being sent to API
  const [currentWeather, setCurrentWeather] = useState(initialState);

  useEffect(() => {
    const source = axios.CancelToken.source();
    (async () => {
      try {
        const res = await axios("/weather", {
          cancelToken: source.token,
          params: { id: cityId, units: "metric", appid: process.env.REACT_APP_API_KEY }
        });
        setCurrentWeather({ ...initialState, loading: false, success: res });
      } catch (err) {
        setCurrentWeather({ ...initialState, loading: false, failure: err });
      }
    })();

    return () => { source.cancel(); }
  }, [cityId, initialState])

  return currentWeather
}

export default useCurrentWeather
