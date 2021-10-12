import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';

/**
 * Weather forecast for 5 days from the current day with 
 * 3 hours monitoring each day
 */
const useWeatherForecast = (cityID) => {
  // To preven infinite loop to useEffect 
  const initialState = useMemo(() => ({ loading: true, success: null, failure: null }), []);
  // The state of the request being sent to API
  const [requestState, setRequestState] = useState(initialState);

  useEffect(() => {
    const source = axios.CancelToken.source();
    (async () => {
      if (cityID) {
        try {
          setRequestState(initialState);
          const res = await axios("/forecast", {
            cancelToken: source.token,
            params: { id: cityID, units: "metric", appid: process.env.REACT_APP_API_KEY }
          });
          setRequestState({ ...initialState, loading: false, success: res });
        } catch (err) {
          setRequestState({ ...initialState, loading: false, failure: err });
        }
      } else {
        setRequestState(initialState)
      }
    })();

    return () => { source.cancel() }
  }, [cityID, initialState])

  return requestState
}

export default useWeatherForecast
