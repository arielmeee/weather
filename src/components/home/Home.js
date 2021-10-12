import useWeatherForecast from '../../utils/useWeatherForecast';
import useCurrentWeather from '../../utils/useCurrentWeather';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';
import Input from './Input';
import useDebounce from '../../utils/useDebounce';
import { useEffect, useState } from 'react';
import useCityFinder from '../../utils/useCityFinder';

const Home = () => {
  const style = {
    background: `url("${process.env.PUBLIC_URL}/img/cloudy.jpg") no-repeat center fixed`,
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh'
  }

  const cityFinder = useCityFinder();
  const [cityID, setCityID] = useState("");
  const [query, setQuery, result] = useDebounce(cityFinder);
  const currentState = useCurrentWeather(cityID);
  const forecastState = useWeatherForecast(cityID);
  
  useEffect(() => {
    /* If the input value ends with an "Invinsible Operator (U+2063)"
      that means the user has selected an option from the datalist
      therefore, we should make an API call */
    if (query.slice(-1) === '\u2063') {
      setCityID(query.slice(0, -1))
    }
  }, [query])

  return (
    <main style={style}>
      <div className="col-md-8 col-sm-11 mx-auto">
        {forecastState.success && <WeatherForecast list={forecastState.success.data.list} />}
      </div>
      <div style={{ paddingTop: forecastState.success ? '2rem' : '14rem' }}>
        <Input result={result} setQuery={setQuery} />
        {currentState.success && <CurrentWeather data={currentState.success.data} />}
      </div>
    </main>
  )
}

export default Home
