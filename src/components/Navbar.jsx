import React, { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link, useLocation } from 'react-router-dom'
import DashxLogoSVG from './SVG/DashxLogoSVG'

const classes = {
  navItemCurrent: 'border-indigo-500 inline-flex items-center px-6 rounded text-sm font-bold',
  navItemDefault: 'border-transparent hover:border-gray-300 inline-flex items-center font-medium'
}

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

const Navbar = () => {
  const [ current, setCurrent ] = useState(false)
  const { pathname } = useLocation()

  return (
    <Disclosure as="nav" className="shadow-md shadow-gray-500">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16">
              <div className="flex justify-between w-full">
                <div className="flex-shrink-0 flex items-center">
                  <DashxLogoSVG width="40px" height="40px" />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navItems.map(({ path, label }) => (
                    <div
                      className={pathname === path ? classes.navItemCurrent : classes.navItemDefault}
                      key={path}
                    >
                      <Link to={path} onClick={() => setCurrent(!current)}>
                        {label}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map(({ path, label }) => (
                <Link key={path} to={path}>
                  <Disclosure.Button
                    as="a"
                    className="bg-transparent text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  >
                    {label}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
