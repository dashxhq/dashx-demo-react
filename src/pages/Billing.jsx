import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import dashx from '../lib/dashx'

const Billing = () => {
  const location = useLocation()

  useEffect(() => {
    dashx.track('Page Viewed', { path: location.pathname })
  }, [])

  return (
    <h1 className="text-2xl font-semibold text-gray-900">Billing</h1>
  )
}

export default Billing
