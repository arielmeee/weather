/**
 * Capitalize a sentence
 */
export const capitalize = text => text.charAt(0).toLocaleUpperCase().concat(text.slice(1));

/**
 * Standard date format
 */
export const dateFormat = { hour12: true, weekday: "long", hour: "numeric", minute: "numeric" }

/**
 * Destructures the needed properties from the object sent by the API
 * Visit https://openweathermap.org/current#current_JSON for detailed documentation about the response
 */
export const responseDestructurer = (data) => {
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
    name, // City name
    dt_txt // 
  } = data;
  const formattedDate = new Date(dt_txt).toLocaleString('en-NZ', dateFormat)
  
  return { description, temp, temp_min, temp_max, humidity, speed, all, name, dt_txt: formattedDate }
}
