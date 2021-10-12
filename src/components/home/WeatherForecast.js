import { motion } from 'framer-motion';
import { useMemo } from 'react';
import WeatherForecastContainer from '../../layouts/WeatherForecastContainer';

const parent = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
}

const WeatherForecast = ({ list }) => {
  // Get all the dates excluding the redundant ones
  const dates = useMemo(() => {
    const uniqueDates = list.reduce((stored, current) => {
      let elementDate = new Date(current.dt_txt).toLocaleDateString();
      if (!stored.includes(elementDate)) {
        stored.push(elementDate);
      }
      return stored
    }, [])
    return uniqueDates
  }, [list])
  
  // Segregate each data according to the dates they belong to
  const forecasts = useMemo(() => {
    const timeForecasts = dates.reduce((stored, current) => {
      let currentDay = new Date(current).toLocaleString("en-NZ", { weekday: "long" });
      let nthDay = list.filter((value) => {
        let elementDate = new Date(value.dt_txt).toLocaleDateString();
        return elementDate === current
      })
      stored.push({ forecast: nthDay, day: currentDay });
      return stored
    }, [])
    return timeForecasts
  }, [list, dates])

  return (
    <motion.div variants={parent} initial="hidden" animate="visible">
      <nav className="col-sm-9 col-11 mb-2 mx-auto">
        <div className="nav nav-tabs justify-content-center" id="nav-tab" role="tablist">
          {forecasts.map((current, index) => (
            <a key={index} className={`nav-item nav-link text-dark ${(index === 0) && "active"}`} id={`${current.day}-tab`} data-toggle="tab" href={`#${current.day}`} role="tab" aria-controls={current.day} aria-selected="true">
              {current.day}
            </a>
          ))}
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        {forecasts.map((current, index) => (
          <div key={index} className={`tab-pane fade show ${(index === 0) && "active"}`} id={current.day} role="tabpanel" aria-labelledby={`${current.day}-tab`}>
            <div className="d-flex flex-row flex-wrap justify-content-center">
              {current.forecast.map((timeForecast, i) => (
                <WeatherForecastContainer key={i} data={timeForecast} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default WeatherForecast
