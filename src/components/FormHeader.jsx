import React from 'react'

const FormHeader = ({ heading, logo }) => (
  <div className="mb-10">
    <div className="flex justify-center">
      <img src={logo} alt="DashX-Logo" className="w-36 mb-4" />
    </div>
    <h2 className="text-center sm:text-2xl md:text-3xl">{heading}</h2>
  </div>
)

export default FormHeader
