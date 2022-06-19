import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginForm from './components/forms/LoginForm'
import Redirect from './components/Redirect'
import Register from './pages/Register'
import UpdateProfileForm from './components/forms/UpdateProfileForm'
import { useAuth } from './components/contexts/CurrentUserProvider'
import DashboardComponent from './components/Dashboard/DashboardComponent'

const DashboardRoutes = () => (
  <DashboardComponent>
    <Routes>
      <Route exact path="/update/profile" element={<UpdateProfileForm />} />
    </Routes>
  </DashboardComponent>
)

const RoutesWrapper = () => (
  <Routes>
    <Route exact path="/" element={<Redirect />} />
    <Route
      exact
      path="login"
      element={(
        <LoginForm />
      )}
    />
    <Route exact path="register" element={<Register />} />
  </Routes>
)

const App = () => {
  const { user } = useAuth()
  const token = localStorage.getItem('jwt')

  return (
    <div className="h-screen font-poppins">
      <BrowserRouter>
        {token && user ? (
          <DashboardRoutes />
        ) : (
          <RoutesWrapper />
        )}
      </BrowserRouter>
    </div>
  )
}

export default App

// TODO: look for context and accesstoken accesibility for authentication use cases
