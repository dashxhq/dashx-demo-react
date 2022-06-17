import React from 'react'
import { ErrorMessage, useField } from 'formik'

const classes = {
  input: 'appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
}

const Input = (props) => {
  const [ field ] = useField(props)
  const { name, label, placeholder, type } = props
  return (
    <div className="my-5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">{label}</label>
      <input
        className={classes.input}
        placeholder={placeholder}
        type={type}
        {...field}
      />
      <ErrorMessage name={name} component="div" className="font-medium text-sm text-red-600 mt-2" />
    </div>
  )
}

export default Input
