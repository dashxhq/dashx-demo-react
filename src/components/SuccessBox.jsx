import React from 'react'

const SuccessBox = ({ successMessage }) => (
  <div
    className="sm:max-w-md p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 my-2"
    role="alert"
  >
    <span className="font-medium">{successMessage}</span>
  </div>
)

export default SuccessBox
