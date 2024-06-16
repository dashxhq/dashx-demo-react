import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useCurrentUserContext } from '../../contexts/CurrentUserContext'

const RequireUser = ({ withRedirect = false }) => {
  const location = useLocation()
  const { user } = useCurrentUserContext()

  if (user) {
    return <Outlet />
  }

  return <Navigate to="/login" state={withRedirect ? { from: location.pathname } : {}} replace />
}
export default RequireUser
