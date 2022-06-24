import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Content from '../../pages/Content'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Navbar setSidebarOpen={setSidebarOpen} />
      <Content>
        <Outlet />
      </Content>
    </div>
  )
}
