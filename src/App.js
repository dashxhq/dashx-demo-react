import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './components/forms/LoginForm'
import Dashboard from './pages/Dashboard'
import Redirect from './components/Redirect'
import CurrentUserProvider from './components/contexts/CurrentUserProvider'
import Register from './pages/Register'
import RequireAuth from './components/RequireAuth'
import UpdateProfileForm from './components/forms/UpdateProfileForm'
import Navigation from './components/Navigation'

const App = () => (
  <div className="h-full font-poppins">
    <CurrentUserProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Redirect />} />
          <Route
            exact
            path="login"
            element={(
              <LoginForm />
            )}
          />
          <Route
            exact
            path="dashboard"
            element={(
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/update/profile"
            element={(
              <RequireAuth>
                <UpdateProfileForm />
              </RequireAuth>
            )}
          />
          <Route exact path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </CurrentUserProvider>
  </div>
)

export default App

// TODO: look for context and accesstoken accesibility for authentication use cases
