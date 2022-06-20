import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import UpdateProfileForm from './components/forms/UpdateProfileForm'
import LoginForm from './components/forms/LoginForm'
import RegisterForm from './components/forms/RegisterForm'
import RequireAuth from './components/RequireAuth'
import Layout from './components/Layout'
import { useAuth } from './components/contexts/CurrentUserProvider'
import DashboardPage from './pages/DashboardPage'
import DashboardHome from './components/Dashboard/DashboardHome'
import Billing from './components/Dashboard/Billing'
import Bookmarks from './components/Dashboard/Bookmarks'
import Settings from './components/Dashboard/Settings'

const App = () => {
  const { user, setUser } = useAuth()
  const token = localStorage.getItem('jwt')
  const userData = localStorage.getItem('user') || {}

  useEffect(() => {
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <div className="h-screen font-poppins bg-gray-100">
      <Routes>
        <Route element={<Layout />}>
          <Route exact path="/" element={<RequireAuth />} />
          <Route exact path="login" element={<LoginForm />} />
          <Route exact path="register" element={<RegisterForm />} />
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          >
            <Route exact path="/dashboard" element={<DashboardHome />} />
            <Route path="update-profile" element={<UpdateProfileForm />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
