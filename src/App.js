import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import RequireAuth from './components/RequireAuth'
import { useAuth } from './components/contexts/CurrentUserProvider'
import ForgotPassword from './pages/ForgotPassword'
import DashboardHome from './pages/dashboard/DashboardHome'
import UpdateProfile from './pages/dashboard/UpdateProfile'
import DashboardLayout from './components/layouts/DashboardLayout'
import Bookmarks from './pages/dashboard/Bookmarks'
import Billing from './pages/dashboard/Billing'
import Settings from './pages/dashboard/Settings'
import NotFound from './pages/NotFound'

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
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Redirect />} />
        <Route element={<RequireAuth setUser={setUser} user={user} />}>
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="update-profile" element={<UpdateProfile />} />
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
