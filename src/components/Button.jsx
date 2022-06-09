import React from "react";

const classes = {
  button: "group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-500 focus:outline-none focus:ring-1 focus:ring-purple-500 mt-5 transition duration-300"
}
const Button = ({ type="button", label, handleSubmit }) => {
  return (
    <button className={classes.button} type={type} onClick={handleSubmit}>
      {label}
    </button>
  )
}

export default Button;
