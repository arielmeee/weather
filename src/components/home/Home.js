import useCurrentWeather from '../../utils/useCurrentWeather';
import WeatherInfo from './CurrentWeather';
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
  const { success, loading, failure } = useCurrentWeather(cityID);
  
  useEffect(() => {
    if (query.slice(-1) === '\u2063') {
      setCityID(query.slice(0, -1))
    }
  }, [query])

  return (
    <main style={style}>
      <div style={{ paddingTop: '13rem' }}>
        <Input result={result} setQuery={setQuery} />
        {loading && <h4 className="text-center">Loading...</h4>}
        {success && <WeatherInfo data={success.data} />}
        {failure && <h4 className="text-center">Error!</h4>}
      </div>
    </main>
  )
}

export default Home
