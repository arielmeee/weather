import { capitalize, dateFormat, responseDestructurer } from "../../utils/miniHelper";
import { motion } from 'framer-motion';

const parent = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
}

const CurrentWeather = ({ data }) => {
  const current = responseDestructurer(data);

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
            <h1>{current.temp}</h1> <span className="mt-2 ml-1">&#8451;</span>
          </div>
        </div>
        <div className="col-sm-7 order-sm-2 order-1 text-right">
          <h3 className="mb-0">{current.name}</h3>
          <small>{new Date().toLocaleString('en-NZ', dateFormat)}</small> <br />
          <small>{capitalize(current.description)}</small>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-sm-5">
          Humidity: {current.humidity}% <br />
          Wind: {current.speed} <small>meter/sec</small> <br />
          Cloudiness: {current.all}%
        </div>
        <div className="col-sm-7">
          Max temperature: {current.temp_max} &#8451; <br />
          Min temperature: {current.temp_min} &#8451;
        </div>
      </div>
    </motion.div>
  )
}

export default CurrentWeather
