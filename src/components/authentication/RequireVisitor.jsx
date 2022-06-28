import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import checkAuth from '../../lib/checkAuth'

const RequireVisitor = () => {
  const isAuthenticated = checkAuth()

  if (!isAuthenticated) {
    return <Outlet />
  }

  return <Navigate to="/" replace />
}

export default RequireVisitor
