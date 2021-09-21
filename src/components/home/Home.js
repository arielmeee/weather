import useCurrentWeather from '../../utils/useCurrentWeather';
import Input from './Input';
import WeatherInfo from './CurrentWeather';

const Home = () => {
  const style = {
    background: `url("${process.env.PUBLIC_URL}/img/cloudy.jpg") no-repeat center fixed`,
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh'
  }
  // TODO: Make city id dynamic via input tag
  const { success, loading, failure } = useCurrentWeather("1702934");
  return (
    <main style={style}>
      <div style={{ paddingTop: '13rem' }}>
        <Input />
        {loading && <h4 className="text-center">Loading...</h4>}
        {success && <WeatherInfo data={success.data} />}
        {failure && <h4 className="text-center">Error!</h4>}
      </div>
    </main>
  )
}

export default Home

