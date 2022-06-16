import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/CurrentUserProvider'
import DashxLogoSVG from '../SVG/DashxLogoSVG'
import LogoutSVG from '../SVG/LogoutSVG'
import { resetLocalStorage } from '../hooks/useLocalStorage'

const dashboardSVG = (
  <svg
    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
  </svg>
)

const upperNavItems = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    svg: dashboardSVG
  },
  {
    path: '/',
    label: 'Billing',
    svg: dashboardSVG
  }
]

const lowerNavItems = [
  {
    path: '/update/profile',
    label: 'Update Profile',
    svg: dashboardSVG
  }
]

const classes = {
  navItem: 'flex gap-4 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
}

const Avatar = ({ letter, name, email }) => (
  <div className="flex gap-4">
    <div className="w-14 h-14 flex justify-center items-center overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600 mb-3">
      <span className="text-3xl">{letter}</span>
    </div>
    <div>
      <h4>{name}</h4>
      <p
        className="font-thin text-gray-700 text-ellipsis whitespace-nowrap overflow-hidden"
        style={{ maxWidth: '150px' }}
      >
        {email}
      </p>
    </div>
  </div>
)

const DashboardSidebar = () => {
  const { user: { first_name, last_name, email }, setUser } = useAuth()
  const avatarLetter = first_name[0].toUpperCase()
  const userName = `${first_name} ${last_name}`

  return (
    <aside className="w-64 border-r-black" aria-label="Sidebar">
      <div className="h-screen overflow-y-auto py-4 pt-6 px-3 bg-gray-200 border-2 border-r-indigo-500 rounded dark:bg-gray-800">
        <div className="flex justify-start p-2 items-center flex-shrink-0 mb-4 text-center gap-4">
          <DashxLogoSVG width="25px" height="25px" />
          <Link to="/">
            <span className="text-2xl font-bold">Demo App</span>
          </Link>
        </div>
        <div className="flex flex-col justify-between" style={{ height: '92%' }}>
          <div>
            <ul className="space-y-2">
              {upperNavItems.map(({ path, label, svg }) => (
                <Link to={path} key={path} className={classes.navItem}>
                  {svg}
                  <span>
                    {label}
                  </span>
                </Link>
              ))}
            </ul>
          </div>
          <div>
            <Avatar letter={avatarLetter} name={userName} email={email} />
            <ul className="space-y-2">
              {lowerNavItems.map(({ path, label, svg }) => (
                <Link to={path} key={path} className={classes.navItem}>
                  {svg}
                  <span>
                    {label}
                  </span>
                </Link>
              ))}
              <div className={classes.navItem}>
                <LogoutSVG width="24px" height="24px" />
                <button
                  onClick={() => {
                    resetLocalStorage([ 'jwt', 'dashxToken' ])
                    setUser(null)
                  }}
                >
                  Logout
                </button>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default DashboardSidebar
