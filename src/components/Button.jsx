import React from 'react'
import Loader from './Loader'

const classes = {
  button: 'group relative w-full flex gap-3 justify-center py-3 px-4 border border-transparent text-sm font-medium text-base rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 mt-5 transition duration-300'
}
const Button = ({ type = 'button', label, handleSubmit, loading }) => (
  <button className={classes.button} type={type} onClick={handleSubmit} disabled={loading}>
    { loading ? <Loader /> : label }
  </button>
)

export default Button
