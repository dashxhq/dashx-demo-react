import React from 'react'

const AlertBox = ({ alertMessage }) => (
  <div role="alert" className="mt-10 relative">
    <h3 className="text-red-500 bg-red-200 p-3 mt-10 rounded">{alertMessage}</h3>
  </div>
)

export default AlertBox
