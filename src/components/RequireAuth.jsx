import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './contexts/CurrentUserProvider'

const RequireAuth = ({ children }) => {
  const { user } = useAuth()
  const location = useLocation()

  console.log(user, 'userData')

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
