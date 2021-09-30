import { motion } from 'framer-motion';

const Input = ({ result, setQuery }) => {
  
  return (
    <div className="form-group col-lg-3 col-md-4 col-6 mx-auto">
        <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          list="cities"
          className="form-control rounded-pill shadow p-3"
          style={{ backgroundColor: '#ffffff6b' }}
          placeholder="City name ex. Cagayan De Oro"
          onChange={e => setQuery(e.target.value)}
          autoFocus={true}
        />
        
        <datalist id="cities">
          {result && result.slice(0, 50).map((city) => (
            // "Invinsible Operator (U+2063)" is added to each option to detect 
            // if user has selected an option from the datalist to automatically query to API.
            <option value={`${city.id}\u2063`} key={city.id}>
              {city.name} - {city.country}
            </option>
          ))}
        </datalist>
    </div>
  )
}

export default Input
