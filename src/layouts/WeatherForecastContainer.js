import { responseDestructurer } from '../utils/miniHelper';

const WeatherForecastContainer = ({ data }) => {
  const forecast = responseDestructurer(data);

  return (
    <div style={{ width: "10rem" }} className="p-2">
      <div className="shadow rounded p-3">
        <div className="d-flex align-items-start">
          <h5>{forecast.temp}</h5> <span className="ml-1">&#8451;</span>
        </div>
        <small style={{ fontSize: "0.6rem" }}>
          {forecast.dt_txt.split(" ").slice(1).join(" ")}
        </small>
      </div>
    </div>
  )
}

export default WeatherForecastContainer
