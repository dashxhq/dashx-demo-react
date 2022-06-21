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
import { useAuth } from './components/contexts/CurrentUserProvider'

const App = () => {
  const { user, setUser } = useAuth()

  return (
    <div className="h-screen font-poppins bg-gray-50">
      <Routes>
        <Route element={<Layout />}>
          <Route exact path="/" element={<RequireAuth setUser={setUser} user={user} />} />
          <Route exact path="login" element={<LoginForm />} />
          <Route exact path="register" element={<RegisterForm />} />
          <Route
            exact
            path="dashboard"
            element={
              <RequireAuth user={user} setUser={setUser}>
                <DashboardPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
