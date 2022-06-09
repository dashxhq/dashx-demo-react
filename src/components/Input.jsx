import React from "react";
import { ErrorMessage, useField } from 'formik';

const classes = {
  input: "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ring-fuchsia-400 focus:z-10 sm:text-base"
}

const Input = (props) => {
  const [field] = useField(props)
  return (
    <div className="my-5">
      <label htmlFor={props.name} className="text-lg">{props.label}</label>
      <input
        className={classes.input}
        placeholder={props.placeholder}
        {...field}
      />
      <ErrorMessage name={props.name} component="div" className="font-thin text-red-500" />
    </div>
  )
}

export default Input;
