import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import { useAuth } from './contexts/CurrentUserProvider'

export default function Navigation() {
  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard'
  const { user } = useAuth()

  return (
    <>
      {(!isDashboard && !user) && (
        <Navbar />
      )}
    </>
  )
}
