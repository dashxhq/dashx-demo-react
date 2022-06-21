import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginForm from './components/forms/LoginForm'
import RegisterForm from './components/forms/RegisterForm'
import RequireAuth from './components/RequireAuth'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import { useAuth } from './components/contexts/CurrentUserProvider'
import ForgotPassword from './pages/ForgotPassword'
import DashboardHome from './components/Dashboard/DashboardHome';
import UpdateProfileForm from './components/forms/UpdateProfileForm';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import Bookmarks from './components/Dashboard/Bookmarks';
import Billing from './components/Dashboard/Billing';
import Settings from './components/Dashboard/Settings';

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
            path="dashboard"
            element={
              <RequireAuth user={user} setUser={setUser}>
                <DashboardPage />
              </RequireAuth>
            }
          >
            <Route index element={<DashboardHome />} />
          </Route>
          <Route
            exact
            path="update-profile"
            element={
              <RequireAuth user={user} setUser={setUser}>
                <DashboardLayout>
                  <UpdateProfileForm />
                </DashboardLayout>
              </RequireAuth>
            }
          />
          <Route
            exact
            path="bookmarks"
            element={
              <RequireAuth user={user} setUser={setUser}>
                <DashboardLayout>
                  <Bookmarks />
                </DashboardLayout>
              </RequireAuth>
            }
          />
          <Route
            exact
            path="billing"
            element={
              <RequireAuth user={user} setUser={setUser}>
                <DashboardLayout>
                  <Billing />
                </DashboardLayout>
              </RequireAuth>
            }
          />
          <Route
            exact
            path="settings"
            element={
              <RequireAuth user={user} setUser={setUser}>
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
