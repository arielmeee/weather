import { useCallback } from 'react';
import cities from './city.list.json';

/**
 * Returns an array of cities that matches user input
 */
const useCityFinder = () => {
  const fn = useCallback((query) => {
    return cities.filter((city) => new RegExp(`.*${query}.*`, 'i').test(city.name))
  }, []);

  return fn
}

export default useCityFinder
