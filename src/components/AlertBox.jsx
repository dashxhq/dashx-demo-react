import React from 'react'

const AlertBox = ({ alertMessage, setError }) => (
  <div role="alert" className="mb-10 relative">
    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
      Error
    </div>
    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
      <p>{alertMessage}</p>
    </div>
    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
      <svg
        className="h-6 w-6 text-white-500 border-white"
        role="button"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        onClick={() => setError('')}
      >
        <title>Close</title>
        <path
          d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
        />
      </svg>
    </span>
  </div>
)

export default AlertBox
