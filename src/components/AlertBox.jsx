import React from 'react'

const AlertBox = ({ alertMessage }) => (
  <div
    className="mt-5 p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
    role="alert"
  >
    <span className="font-medium ml-6">{alertMessage}</span>
  </div>
)

export default AlertBox
