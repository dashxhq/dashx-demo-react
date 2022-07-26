import React, { Fragment } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { Menu, Transition } from '@headlessui/react'
import { MenuAlt2Icon } from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import classNames from 'classnames'

import { useCurrentUserContext } from '../contexts/CurrentUserContext'
import CartPopover from './CartPopover'
import NotificationsPopover from './NotificationsPopover'

const userNavigation = [
  { name: 'Profile', href: '/update-profile' },
  { name: 'Settings', href: '/settings' }
]

const Navbar = ({ setSidebarOpen, cartItems }) => {
  const navigate = useNavigate()
  const { logout } = useCurrentUserContext()

  return (
    <div className="md:pl-64 flex flex-col">
      <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button
          type="button"
          className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 px-4 flex items-center justify-between">
          <div className="flex-1 flex">
            <form className="w-full flex md:ml-0" action="src/components/Navbar" method="GET">
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5" aria-hidden="true" />
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
          <div className="ml-4 flex items-center justify-center md:ml-6 gap-5">
            <CartPopover cartItems={cartItems} />
            <NotificationsPopover />
            <Menu as="div" className="relative">
              <div>
                <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </Menu.Button>
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
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <Menu.Item
                      key={item.name}
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                    >
                      {() => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            )
                          }
                        >
                          {item.name}
                        </NavLink>
                      )}
                    </Menu.Item>
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
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
