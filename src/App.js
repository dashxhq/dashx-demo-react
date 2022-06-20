import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import jwt from 'jwt-decode'
import UpdateProfileForm from './components/forms/UpdateProfileForm'
import DashboardLayout from './components/Dashboard/DashboardLayout'
import LoginForm from './components/forms/LoginForm'
import RegisterForm from './components/forms/RegisterForm'
import RequireAuth from './components/RequireAuth'
import Layout from './components/Layout'
import { useAuth } from './components/contexts/CurrentUserProvider'

const Bookmarks = () => (
  <h1 className="text-2xl font-semibold text-gray-900">Bookmarks</h1>
)

const Billing = () => (
  <h1 className="text-2xl font-semibold text-gray-900">Billing</h1>
)

const App = () => {
  const { user, setUser } = useAuth()
  const token = localStorage.getItem('jwt')
  const userData = localStorage.getItem('user') || {}

  useEffect(() => {
    console.log('normal')
    if (token && userData) {
      console.log('came here')
      setUser(JSON.parse(userData))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [ user ])

  return (
    <div className="h-screen font-poppins">
      <Routes>
        <Route element={<Layout />}>
          <Route exact path="/" element={<RequireAuth />} />
          <Route exact path="login" element={<LoginForm />} />
          <Route exact path="register" element={<RegisterForm />} />
          <Route
            path="dashboard/*"
            element={(
              <RequireAuth>
                <DashboardLayout />
              </RequireAuth>
            )}
          >
            <Route path="update-profile" element={<UpdateProfileForm />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="billing" element={<Billing />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
