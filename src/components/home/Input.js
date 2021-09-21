import { motion } from 'framer-motion';

const Input = () => {
  return (
    <div className="form-group col-lg-3 col-md-4 col-6 mx-auto">
      <motion.input
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        type="text"
        className="form-control rounded-pill shadow p-3"
        style={{ backgroundColor: '#ffffff6b' }}
        placeholder="City name ex. Cagayan De Oro"
        autoFocus={true}
      />
    </div>
  )
}

export default Input
