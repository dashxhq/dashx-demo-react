import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDashXProvider } from '@dashx/react'


const Notifications = () => {
  const location = useLocation()
  const dashx = useDashXProvider()

  useEffect(() => {
    dashx.track('Page Viewed', { path: location.pathname })
  }, [dashx, location.pathname])

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        <button className="py-2 px-4 rounded bg-blue-500 text-white">Send notification</button>
      </div>
    </>
  )
}

export default Notifications
