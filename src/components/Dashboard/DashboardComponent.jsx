import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  HomeIcon,
  MenuIcon,
  XIcon,
  RefreshIcon,
  LogoutIcon
} from '@heroicons/react/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/CurrentUserProvider'
import DashboardContent from './DashboardContent'
import logo from '../../assets/dashx-logo.svg'

const navigation = [
  { path: '/dashboard', label: 'Dashboard', Svg: HomeIcon },
  { path: '/', label: 'Billing', Svg: RefreshIcon }
]

const Avatar = ({ letter, name, email }) => (
  <div className="flex gap-4 items-center">
    <div className="w-14 h-14 flex justify-center items-center overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600 mb-3">
      <span className="text-3xl">{letter}</span>
    </div>
    <div>
      <h4 className="font-medium">{name}</h4>
      <p
        className="text-sm text-gray-500 text-ellipsis whitespace-nowrap overflow-hidden"
        style={{ maxWidth: '150px' }}
      >
        {email}
      </p>
    </div>
  </div>
)

const DashboardComponent = ({ children }) => {
  const [ sidebarOpen, setSidebarOpen ] = useState(false)
  const {
    user: { first_name, last_name, email } = {},
    setUser
  } = useAuth() || JSON.parse(localStorage.getItem('user'))
  const avatarLetter = first_name[0].toUpperCase()
  const navigate = useNavigate()
  const userName = `${first_name} ${last_name}`

  const logOut = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
    localStorage.removeItem('dashxToken')
    navigate('/login')
    setUser(null)
  }

  return (
    <>
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
                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
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
                  <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    <div className="flex-shrink-0 flex items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                        alt="Workflow"
                      />
                    </div>
                    <nav className="mt-5 px-2 space-y-1">
                      {navigation.map(({ path, label, Svg }) => (
                        <>
                          <Link
                            key={path}
                            to={path}
                            className="group flex items-center gap-5 mb-3 p-3 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          >
                            <Svg className="h-5 w-5 text-blue-500" />
                            {label}
                          </Link>
                        </>
                      ))}
                    </nav>
                  </div>
                  <div className="p-2 mx-2 mb-8 flex gap-3 flex-col">
                    <Avatar letter={avatarLetter} name={userName} email={email} />
                    <ul>
                      <div className="flex items-center gap-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium">
                        <RefreshIcon className="h-7 w-7 text-blue-500" />
                        <Link
                          to="/update/profile"
                          className="group flex items-center gap-5 p-4 w-full text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Update Profile
                        </Link>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium">
                        <LogoutIcon className="h-7 w-7 text-blue-500" />
                        <button
                          onClick={logOut}
                          className="group flex items-center gap-5 p-4 w-full text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Logout
                        </button>
                      </div>
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img src={logo} className="w-32 m-auto" alt="dashxLogo" />
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                {navigation.map(({ path, label, Svg }) => (
                  <Fragment key={path}>
                    <Link
                      to={path}
                      className="group flex items-center gap-5 mb-3 p-3 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <Svg className="h-5 w-5 text-blue-500" />
                      {label}
                    </Link>
                  </Fragment>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200">
              <div className="p-4 mb-3 flex gap-3 flex-col">
                <Avatar letter={avatarLetter} name={userName} email={email} />
                <ul>
                  <div className="flex items-center gap-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium">
                    <RefreshIcon className="h-7 w-7 text-blue-500" />
                    <Link
                      to="/update/profile"
                      className="group flex items-center gap-5 p-4 w-full text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Update Profile
                    </Link>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium">
                    <LogoutIcon className="h-7 w-7 text-blue-500" />
                    <button
                      onClick={logOut}
                      className="group flex items-center gap-5 p-4 w-full text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Logout
                    </button>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <DashboardContent>
            {children}
          </DashboardContent>
        </div>
      </div>
    </>
  )
}

export default DashboardComponent
