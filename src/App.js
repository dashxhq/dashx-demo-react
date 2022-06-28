import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Bookmarks from './pages/Bookmarks'
import Billing from './pages/Billing'
import Settings from './pages/Settings'

import DashboardLayout from './components/layouts/DashboardLayout'
import RequireUser from './components/authentication/RequireUser'
import RequireVisitor from './components/authentication/RequireVisitor'

const App = () => {
  return (
    <div className="h-screen font-poppins bg-gray-50">
      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<DashboardLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="update-profile" element={<Profile />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        <Route element={<RequireVisitor />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
