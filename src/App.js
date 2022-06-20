import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UpdateProfileForm from './components/forms/UpdateProfileForm'
import LoginForm from './components/forms/LoginForm'
import RegisterForm from './components/forms/RegisterForm'
import RequireAuth from './components/RequireAuth'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import DashboardHome from './components/Dashboard/DashboardHome'
import Billing from './components/Dashboard/Billing'
import Bookmarks from './components/Dashboard/Bookmarks'
import Settings from './components/Dashboard/Settings'

const App = () => {
  return (
    <div className="h-screen font-poppins bg-gray-50">
      <Routes>
        <Route element={<Layout />}>
          <Route exact path="/" element={<RequireAuth />} />
          <Route exact path="login" element={<LoginForm />} />
          <Route exact path="register" element={<RegisterForm />} />
          <Route
            exact
            path="dashboard"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          >
            <Route exact path="/dashboard" element={<DashboardHome />} />
            <Route exact path="update-profile" element={<UpdateProfileForm />} />
            <Route exact path="bookmarks" element={<Bookmarks />} />
            <Route exact path="billing" element={<Billing />} />
            <Route exact path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
