import React from "react";

const classes = {
  input: "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ring-fuchsia-400 focus:z-10 sm:text-base"
}

const Input = ({
  label,
  type,
  name,
  placeholder,
  handleChange,
  value,
  required
}) => {
  return (
    <div className="my-5">
      <label htmlFor={name} className="text-lg">{label}</label>
      <input
        className={classes.input}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        type={type}
        value={value}
        required={required}
        autoComplete="off"
      />
    </div>
  )
}

export default Input;
