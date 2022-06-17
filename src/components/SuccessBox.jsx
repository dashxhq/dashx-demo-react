import React from 'react'

const SuccessBox = ({ successMessage }) => (
  <div role="alert" className="mt-10 relative">
    <h3 className="text-green-600 bg-green-200 p-3 mt-10 rounded">{successMessage}</h3>
  </div>
)

export default SuccessBox
