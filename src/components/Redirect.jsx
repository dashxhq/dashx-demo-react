import React from 'react'
import { useAuth } from './contexts/CurrentUserProvider'
import LoginForm from './forms/LoginForm'
import Dashboard from '../pages/Dashboard'

const Redirect = () => {
  const { user } = useAuth()

  if (!user) {
    return <LoginForm />
  }
  return <Dashboard />
}

export default Redirect
