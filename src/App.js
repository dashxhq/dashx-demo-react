import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Bookmarks from './pages/Bookmarks'
import Billing from './pages/Billing'
import Contact from './pages/Contact'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import Settings from './pages/Settings'
import Store from './pages/Store'

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
            <Route path="store" element={<Store />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="billing" element={<Billing />} />
            <Route path="update-profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
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
