import React from 'react'
import Loader from './Loader'

const buttonClass =
  'group relative w-full hover:bg-indigo-500 gap-3 justify-center py-2 px-4 border border-transparent text-sm font-medium text-base rounded-md hover:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition duration-300 text-indigo-500'

const Button = ({
  children,
  type = 'button',
  variant,
  label,
  loading,
  message,
  onClick
}) => {
  return (
    <button
      className={`
        ${buttonClass}
        ${variant !== 'outlined' ? 'bg-indigo-600' : 'border-indigo-500'}
      `}
      type={type}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <Loader message={message} />
      ) : (
        <p className={`${variant === 'outlined' ? 'hover:text-white' : 'text-white'}`}>{label}</p>
      )}
      {children}
    </button>
  )
}

export default Button
