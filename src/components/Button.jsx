import React from 'react'
import Loader from './Loader'

const Button = ({ children, type = 'button', variant, label, handleSubmit, loading }) => (
  <button
    className={
      `group relative w-full flex gap-3 justify-center py-2 px-4 border border-transparent text-sm font-medium text-base rounded-md ${variant !== 'outlined' ? 'bg-indigo-600' : 'bg-transparent border-indigo-500'} hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 mt-2 transition duration-300`
    }
    type={type}
    onClick={handleSubmit}
    disabled={loading}
  >
    { loading ? <Loader /> : (
      <p className={`${variant === 'outlined' ? 'text-indigo-200' : 'text-white'}`}>
        {label}
      </p>
    ) }
    {children}
  </button>
)

export default Button
