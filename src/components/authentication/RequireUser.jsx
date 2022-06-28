import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import checkAuth from '../../lib/checkAuth'

const RequireUser = () => {
  const location = useLocation()
  const isAuthenticated = checkAuth()

  if (isAuthenticated) {
    return <Outlet />
  }

  return <Navigate to="/login" state={{ from: location.pathname }} replace />
}
export default RequireUser
