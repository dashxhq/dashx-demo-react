import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const RequireAuth = ({ children, user, setUser }) => {
  const location = useLocation()
  const userData = localStorage.getItem('user')

  useEffect(() => {
    const userData = localStorage.getItem('user')

    if (userData) {
      setUser(JSON.parse(userData))
    }

  }, [])

  if (!userData && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children || <Navigate to="/dashboard" />
}

export default RequireAuth
