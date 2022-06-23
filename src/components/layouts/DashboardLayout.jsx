import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../../pages/dashboard/DashboardSidebar'
import DashboardNavbar from '../../pages/dashboard/DashboardNavbar'
import DashboardContent from '../../pages/dashboard/DashboardContent'

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <DashboardNavbar setSidebarOpen={setSidebarOpen} />
      <DashboardContent>
        <Outlet />
      </DashboardContent>
    </div>
  )
}
