import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './components/forms/LoginForm'
import Dashboard from './pages/Dashboard'
import Redirect from './components/Redirect'
import CurrentUserProvider from './components/contexts/CurrentUserProvider'
import Register from './pages/Register'
import RequireAuth from './components/RequireAuth'
import Navbar from './components/Navbar'
import { useLocalStorage } from './components/hooks/useLocalStorage'
import UpdateProfileForm from './components/forms/UpdateProfileForm'

const App = () => {
  const [ value ] = useLocalStorage('dashxToken')

  return (
    <div className="h-full m-auto sm:px-6 lg:px-8 font-poppins">
      <CurrentUserProvider>
        <BrowserRouter>
          <Navbar />
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
}

export default App
