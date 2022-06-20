import React from 'react'

const SuccessBox = ({ successMessage }) => (
  <div role="alert" className="relative">
    <h3 className="text-green-700 bg-green-200 p-3 mt-6 max-w-md rounded">{successMessage}</h3>
  </div>
)

export default SuccessBox
