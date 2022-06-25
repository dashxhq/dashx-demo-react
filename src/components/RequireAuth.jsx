import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequireAuth = ({ user, setUser }) => {
  const location = useLocation()
  const userData = localStorage.getItem('user')

  useEffect(() => {
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  if (!userData && !user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return <Outlet />
}

export default RequireAuth
