import React, { useEffect } from 'react'
import { Preferences } from '@dashx/react/widgets'
import { useLocation } from 'react-router-dom'
import { useDashXProvider } from '@dashx/react'

const NotificationPreferences = () => {
  const location = useLocation()
  const dashx = useDashXProvider()

  useEffect(() => {
    dashx.track('Page Viewed', { path: location.pathname })
  }, [dashx, location.pathname])

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Notification Preferences</h1>
      <Preferences />
    </div>
  )
}

export default NotificationPreferences
