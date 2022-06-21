import React from 'react'
import { ErrorMessage, useField } from 'formik'

const classes = {
  input: 'appearance-none block w-full py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
}

const Input = (props) => {
  const [ field, meta ] = useField(props)
  const { name, label, type } = props
  const errorClass = meta.touched && meta.error ? 'error' : ''

  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        <input
          className={`${errorClass ? 'border border-red-500' : ''} ${classes.input}`}
          type={type}
          {...field}
        />
      </div>
      <ErrorMessage name={name} component="p" className="font-medium text-sm text-red-600 mt-1" />
    </div>
  )
}

export default Input
