import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from './DashboardSidebar'
import DashboardNavbar from './DashboardNavbar'
import DashboardContent from './DashboardContent'

export default function DashboardLayout({ children }) {
  const [ sidebarOpen, setSidebarOpen ] = useState(false)

  return (
    <div>
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <DashboardNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <DashboardContent>
        {children || (<Outlet />)}
      </DashboardContent>
    </div>
  )
}
