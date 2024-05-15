import classNames from 'classnames'
import React, { Fragment, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

import Avatar from './Avatar'
import NotificationBell from './NotificationBell'
import { useCurrentUserContext } from '../contexts/CurrentUserContext'

import api from '../lib/api'

const userNavigation = [
  { name: 'Profile', href: '/update-profile' },
  { name: 'Settings', href: '/settings' }
]

const Navbar = ({ setSidebarOpen }) => {
  const navigate = useNavigate()
  const { logout, user, setUser } = useCurrentUserContext()

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } = {} } = await api.get('/profile')
      setUser(user)
    }

    getProfile()
  }, [setUser])

  return (
    <div className="md:pl-64 flex flex-col">
      <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button
          type="button"
          className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 px-4 flex justify-between">
          <div className="flex-1 flex">
            <form className="w-full flex md:ml-0" action="src/components/Navbar" method="GET">
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="search-field"
                  className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                  placeholder="Search"
                  type="search"
                  name="search"
                />
              </div>
            </form>
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            <button
              type="button"
              className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">View notifications</span>
              <NotificationBell />
            </button>

            <Menu as="div" className="ml-3 relative">
              <div>
                <MenuButton className="max-w-xs bg-white flex items-center text-sm rounded-full">
                  <span className="sr-only">Open user menu</span>
                  <Avatar user={user} />
                </MenuButton>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <MenuItem
                      key={item.name}
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                    >
                      {() => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            classNames(
                              'text-gray-300', // Default text color
                              {
                                '!bg-gray-900 !text-white': isActive,
                                'hover:bg-gray-100': !isActive
                              }
                            )
                          }
                        >
                          {item.name}
                        </NavLink>
                      )}
                    </MenuItem>
                  ))}
                  <button
                    className="block px-4 py-2 flex text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                    onClick={() => {
                      logout()
                      navigate('/login')
                    }}
                  >
                    <Link to="#">Logout</Link>
                  </button>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
