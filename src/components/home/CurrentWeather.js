import { capitalize } from "../../utils/miniHelper";
import { motion } from 'framer-motion';

const parent = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
}

const WeatherInfo = ({ data }) => {
  // Visit https://openweathermap.org/current#current_JSON for detailed documentation about the response
  const {
     weather: [{
      description // Weather condition within the group
    }],
    main: {
      temp, // Current temperature at the moment (Celsius)
      temp_min, // Minimum temperature at the moment (Celsius)
      temp_max, // Maximum temperature at the moment (Celsius)
      humidity // Humidity percentage
    },
    wind: {
      speed // Wind speed: meter/sec
    },
    clouds: {
      all // Cloudiness percentage
    },
    name // City name
  } = data;

  const dateOptions = { hour12: true, weekday: "long", hour: "numeric", minute: "numeric" };

  return (
    <motion.div
      variants={parent}
      initial="hidden"
      animate="visible"
      className="col-lg-4 col-md-5 col-sm-6 col-7 mx-auto p-3 shadow rounded-lg"
      style={{ backgroundColor: '#fddac65c' }}
    >
      <div className="row">
        <div className="col-sm-5 order-sm-1 order-2">
          <div className="d-flex justify-content-center align-items-start">
            <h1>{temp}</h1> <span className="mt-2 ml-1">&#8451;</span>
          </div>
        </div>
        <div className="col-sm-7 order-sm-2 order-1 text-right">
          <h3 className="mb-0">{name}</h3>
          <small>{new Date().toLocaleString('en-NZ', dateOptions)}</small> <br />
          <small>{capitalize(description)}</small>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-sm-5">
          Humidity: {humidity}% <br />
          Wind: {speed} <small>meter/sec</small> <br />
          Cloudiness: {all}%
        </div>
        <div className="col-sm-7">
          Max temperature: {temp_max} &#8451; <br />
          Min temperature: {temp_min} &#8451;
        </div>
      </div>
    </motion.div>
  )
}

export default WeatherInfo
