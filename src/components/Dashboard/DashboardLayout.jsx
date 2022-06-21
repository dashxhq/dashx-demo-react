import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from './DashboardSidebar'
import DashboardNavbar from './DashboardNavbar'
import DashboardContent from './DashboardContent'

export default function DashboardLayout({ children }) {
  const [ sidebarOpen, setSidebarOpen ] = useState(false)
  const [path, setPath]  = useState('/dashboard')

  return (
    <div>
      <DashboardSidebar path={path} setPath={setPath} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <DashboardNavbar sidebarOpen={sidebarOpen} setPath={setPath} setSidebarOpen={setSidebarOpen} />
      {/* <Outlet /> */}
      <DashboardContent path={path}>
        {children || (<Outlet />)}
      </DashboardContent>
    </div>
  )
}
