import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginForm from './components/forms/LoginForm'
import RegisterForm from './components/forms/RegisterForm'
import RequireAuth from './components/RequireAuth'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import { useAuth } from './components/contexts/CurrentUserProvider'
import ForgotPassword from './pages/ForgotPassword'

const App = () => {
  const { user, setUser } = useAuth()

  return (
    <div className="h-screen font-poppins bg-gray-50">
      <Routes>
        <Route element={<Layout />}>
          <Route exact path="/" element={<RequireAuth setUser={setUser} user={user} />} />
          <Route exact path="login" element={<LoginForm />} />
          <Route exact path="forgot-password" element={<ForgotPassword />} />
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
