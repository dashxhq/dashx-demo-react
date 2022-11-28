import React from 'react'
import { Link } from 'react-router-dom'

import DashXLogo from '../assets/dashx_logo_black.png'

const FormHeader = ({ children }) => (
  <div className="sm:mx-auto sm:w-full sm:max-w-md">
    <div className="flex justify-center items-center">
      <Link to="/">
        <img src={DashXLogo} className="h-12 w-12" alt="DashX Logo" />
      </Link>
    </div>
    <h2 className="mt-6 mb-6 text-center text-3xl font-extrabold text-gray-900">{children}</h2>
  </div>
)

export default FormHeader
