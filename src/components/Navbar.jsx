import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './contexts/CurrentUserProvider'
import logo from '../assets/dashx-logo.svg'

const navItems = [
  {
    path: '/login',
    label: 'Login'
  },
  {
    path: '/register',
    label: 'Register'
  }
]

const classes = {
  navItem: 'hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium'
}

const Navbar = () => {
  const [ open, setOpen ] = useState(false)
  const { user } = useAuth()

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  className="h-12 w-24 bg-indigo-600 p-2 rounded-md cursor-pointer"
                  src={logo}
                  alt="Workflow"
                />
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex justify-end space-x-4">
              {!user && navItems.map(({ path, label }) => (
                <Link to={path} key={path} className={classes.navItem}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setOpen(!open)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!open ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {open ? (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3" />
        </div>
      ) : null}
    </nav>
  )
}

export default Navbar
