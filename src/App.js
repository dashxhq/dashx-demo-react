import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useProductRelease } from '@dashx/react'

import Bookmarks from './pages/Bookmarks'
import Contact from './pages/Contact'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Login from './pages/Login'
import NotificationPreferences from './pages/NotificationPreferences'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import Settings from './pages/Settings'

import DashboardLayout from './components/layouts/DashboardLayout'
import RequireUser from './components/authentication/RequireUser'
import RequireVisitor from './components/authentication/RequireVisitor'
import Logout from './pages/Logout'

const App = () => {
  const { productVariantReleaseRule } = useProductRelease()
  console.log(productVariantReleaseRule)

  return (
    <div className="h-screen font-poppins bg-gray-50">
      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<DashboardLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="notification-preferences" element={<NotificationPreferences />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="update-profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        <Route element={<RequireUser />}>
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route element={<RequireVisitor />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route path="contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
