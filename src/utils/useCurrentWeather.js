import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';

/**
 * Custom hook for accessing current weather data for any location
 * @param {String} cityID The id the city you want to access weather data
 */
const useCurrentWeather = (cityID) => {
  // To preven infinite loop to useEffect 
  const initialState = useMemo(() => ({ loading: false, success: null, failure: null }), []);
  // The state of the request being sent to API
  const [requestState, setRequestState] = useState(initialState);

  useEffect(() => {
    const source = axios.CancelToken.source();
    (async () => {
      if (cityID) {
        try {
          setRequestState({ ...initialState, loading: true })
          const res = await axios("/weather", {
            cancelToken: source.token,
            params: { id: cityID, units: "metric", appid: process.env.REACT_APP_API_KEY }
          });
          setRequestState({ ...initialState, loading: false, success: res });
        } catch (err) {
          setRequestState({ ...initialState, loading: false, failure: err });
        }
      } else {
        setRequestState({ ...initialState, loading: false })
      }
    })();

    return () => { source.cancel(); }
  }, [cityID, initialState])

  return requestState
}

export default useCurrentWeather
