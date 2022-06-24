import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import DashboardHome from './pages/DashboardHome'
import Profile from './pages/Profile'
import Bookmarks from './pages/Bookmarks'
import Billing from './pages/Billing'
import Settings from './pages/Settings'
import DashboardLayout from './components/layouts/DashboardLayout'
import RequireAuth from './components/RequireAuth'
import { useAuth } from './contexts/CurrentUserProvider'

const App = () => {
  const { user, setUser } = useAuth()

  const Redirect = () => {
    const userData = localStorage.getItem('user')

    if (!userData && !user) {
      return <Navigate to="/login" replace />
    }

    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="h-screen font-poppins bg-gray-50">
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route element={<RequireAuth setUser={setUser} user={user} />}>
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="update-profile" element={<Profile />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
