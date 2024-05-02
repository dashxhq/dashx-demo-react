import React, { useEffect } from 'react'
import { Preferences } from '@dashx/react'
import { useLocation } from 'react-router-dom'

import dashx from '../lib/dashx'

const NotificationPreferences = () => {
  const location = useLocation()

  useEffect(() => {
    dashx.track('Page Viewed', { path: location.pathname })
  }, [location.pathname])

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Notification Preferences</h1>
      <Preferences />
    </div>
  )
}

export default NotificationPreferences
