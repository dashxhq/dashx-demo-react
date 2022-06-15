import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './contexts/CurrentUserProvider'
import { useLocalStorage } from './hooks/useLocalStorage'

const Navbar = () => {
  const { user, setUser } = useAuth()
  const [ _, __, resetLocalStorage ] = useLocalStorage([], '')

  return (
    <div className="w-full p-2 bg-amber-100 flex gap-4 underline text-blue-700">
      <Link to="/dashboard">DashBoard</Link>
      {user ? (
        <>
          <div
            onClick={() => {
              resetLocalStorage([ 'jwt', 'dashxToken' ])
              setUser(null)
            }}
            role="button"
            tabIndex={0}
          >
            <Link to="/">
              Logout
            </Link>
          </div>
          <div>
            <Link to="/update/profile">
              Update Profile
            </Link>
          </div>
        </>
      ) : (
        <Link to="/login">
          Login
        </Link>
      )}
      {!user && (
        <Link to="/register">Register</Link>
      )}
    </div>
  )
}

export default Navbar
