import React, { useEffect, useState } from 'react'
import { useLocation, Outlet } from 'react-router-dom'

import Content from '../../pages/Content'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'

import dashx from '../../lib/dashx'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [cartDetails, setCartDetails] = useState([])
  const [fetchingCartItems, setFetchingCartItems] = useState(false)
  const location = useLocation()

  const fetchCartItems = async () => {
    setFetchingCartItems(true)
    try {
      const data = await dashx.fetchCart()
      setCartDetails(data)
    } catch (error) {
      console.log(error)
    }
    setFetchingCartItems(false)
  }

  useEffect(() => {
    if (
      location.pathname === '/' ||
      location.pathname === '/store/cart' ||
      location.pathname === '/store'
    ) {
      fetchCartItems()
    }
  }, [location.pathname])

  return (
    <div>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Navbar setSidebarOpen={setSidebarOpen} cartItems={cartDetails.orderItems || []} />
      <Content>
        <Outlet context={{ cartDetails, fetchingCartItems }} />
      </Content>
    </div>
  )
}
