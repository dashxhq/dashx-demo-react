import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './contexts/CurrentUserProvider'

const RequireAuth = ({ children }) => {
  const { user, setUser } = useAuth()
  const location = useLocation()
  const userData = localStorage.getItem('user')

  useEffect(() => {
    const userData = localStorage.getItem('user')

    if (userData) {
      console.log(JSON.parse(userData), 'userData - require auth')
      setUser(JSON.parse(userData))
    }

  }, [])

  if (!userData && !user) {
    console.log(user, 'in-user')
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
