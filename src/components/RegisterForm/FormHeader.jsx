import React from 'react';

const FormHeader = ({ heading, logo }) => {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img src={logo} alt="DashX-Logo" className="w-36 mb-4" />
      </div>
      <h2 className="font-bold text-center sm:text-3xl md:text-4xl">{heading}</h2>
    </div>
  )
}

export default FormHeader;
