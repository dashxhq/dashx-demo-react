import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import checkAuth from '../../lib/checkAuth'

const RequireVisitor = () => {
  const isAuthenticated = checkAuth()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default RequireVisitor
