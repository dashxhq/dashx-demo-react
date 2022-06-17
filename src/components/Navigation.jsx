import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'

export default function Navigation() {
  const { pathname } = useLocation()

  if (pathname !== '/dashboard') {
    return <Navbar />
  }

  return null
}
