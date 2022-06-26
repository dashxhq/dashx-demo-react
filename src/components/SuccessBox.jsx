import React from 'react'

const SuccessBox = ({ successMessage, classes }) => (
  <div
    className={
      `p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 my-2
      ${classes}`
    }
    role="alert"
  >
    <span className="font-medium">{successMessage}</span>
  </div>
)

export default SuccessBox
