import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './contexts/CurrentUserProvider'

const RequireAuth = ({ children }) => {
  const { user } = useAuth()
  const token = window.localStorage.getItem('jwt')

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default RequireAuth
