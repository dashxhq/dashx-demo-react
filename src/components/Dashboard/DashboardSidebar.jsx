import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { HomeIcon, XIcon, BookmarkIcon, CurrencyDollarIcon } from '@heroicons/react/outline'
import { NavLink as BaseNavLink, useLocation } from 'react-router-dom'
import DashxLogoSVG from '../SVG/DashxLogoSVG'

const navigation = [
  { name: 'Dashboard', href: '', icon: HomeIcon, current: false },
  { name: 'Bookmarks', href: 'bookmarks', icon: BookmarkIcon, current: false },
  { name: 'Billing', href: 'billing', icon: CurrencyDollarIcon, current: false }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavLink = ({ to, children, classes, inactiveClass, ...rest }) => {
  const { pathname } = useLocation()
  const active = pathname === `/dashboard/${to}` ? 'active' : ''

  return (
    <BaseNavLink
      to={to}
      className={`${
        active ? classes : inactiveClass
      } group flex items-center px-2 py-2 text-sm font-medium rounded-md `}
      {...rest}
    >
      {children}
    </BaseNavLink>
  )
}

export default function DashboardSidebar({ setSidebarOpen, sidebarOpen }) {
  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex px-4 gap-6 items-center">
                  <DashxLogoSVG width="30px" height="30px" fill="#ffffff" />
                  <span className="text-xl text-white font-bold">Demo App</span>
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        /* className={({ isActive }) => classNames(
                          isActive ? 'bg-gray-900 text-white ' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                        )} */
                        /* classes={
                          `${isActive
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'} group flex items-center px-2 py-2 text-sm font-medium rounded-md`
                        } */
                        classes="bg-gray-900 text-white"
                        inactiveClass="text-gray-300 hover:bg-gray-700 hover:text-white"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                            'mr-3 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </NavLink>
                    ))}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
          <div className="flex gap-6 items-center h-16 flex-shrink-0 px-4 bg-gray-900">
            <DashxLogoSVG width="30px" height="30px" fill="#ffffff" />
            <span className="text-xl text-white font-bold">Demo App</span>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  /* className={({ isActive }) => classNames(
                    isActive ? 'bg-gray-900 text-white ' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  )} */
                  /* classes={
                    `${isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'} group flex items-center px-2 py-2 text-sm font-medium rounded-md`
                  } */
                  classes="bg-gray-900 text-white"
                  inactiveClass="text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <item.icon
                    className={classNames(
                      item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                      'mr-3 flex-shrink-0 h-6 w-6'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
