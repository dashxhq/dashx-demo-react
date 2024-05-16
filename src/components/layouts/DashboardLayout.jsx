import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Toast } from '@dashx/react'

import Content from '../../pages/Content'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Navbar setSidebarOpen={setSidebarOpen} />
      <Toast />
      <Content>
        <Outlet />
      </Content>
    </div>
  )
}
