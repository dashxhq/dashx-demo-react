import React from 'react'
import { useAuth } from './contexts/CurrentUserProvider'
import LoginForm from './forms/LoginForm'
import DashboardComponent from './Dashboard/DashboardComponent'

const Redirect = () => {
  const { user } = useAuth()
  const token = localStorage.getItem('jwt')

  if (!user && !token) {
    return <LoginForm />
  }

  return <DashboardComponent />
}

export default Redirect
