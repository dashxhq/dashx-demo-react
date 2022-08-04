import React, { useEffect, useState } from 'react'
import { useLocation, Outlet } from 'react-router-dom'

import Content from '../../pages/Content'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

import dashx from '../../lib/dashx'

const matchingPaths = ['/', '/store', '/store/cart']

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
      console.error(error)
    }
    setFetchingCartItems(false)
  }

  useEffect(() => {
    if (
      matchingPaths.includes(location.pathname) ||
      location.pathname.includes('/store/products/')
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
