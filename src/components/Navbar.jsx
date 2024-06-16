import React, { useEffect } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { Link, NavLink, useMatch } from 'react-router-dom'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { NotificationBell } from '@dashx/react/widgets'

import Avatar from './Avatar'
import { useCurrentUserContext } from '../contexts/CurrentUserContext'

import api from '../lib/api'
import { Button, Card, Flex, Popover } from '@dashx/react'

const userNavigation = [
  { name: 'Profile', href: '/update-profile' },
  { name: 'Settings', href: '/settings' }
]

const NavItem = ({ name, href }) => {
  const match = useMatch(href)

  return (
    <Button size="small" asChild variant="ghost" mode={match ? 'distinct' : 'subtle'}>
      <NavLink key={name} to={href}>
        {name}
      </NavLink>
    </Button>
  )
}

const Navbar = ({ setSidebarOpen }) => {
  const { user, setUser } = useCurrentUserContext()

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } = {} } = await api.get('/profile')
      setUser(user)
    }

    getProfile()
  }, [setUser])

  return (
    <div className="md:pl-64 flex flex-col">
      <div className="sticky top-0 flex-shrink-0 flex h-16 bg-white shadow">
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
          <div className="ml-4 flex items-center md:ml-6 gap-3">
            <NotificationBell />

            <Popover.Root>
              <Popover.Trigger>
                <Button
                  shape="square"
                  roundness="full"
                  aria-label="Open user menu"
                  mode="subtle"
                  asChild
                >
                  <button className="!p-0">
                    <Avatar user={user} />
                  </button>
                </Button>
              </Popover.Trigger>
              <Popover.Content width="200px">
                <Card asChild spacing="small">
                  <Flex gap={1} direction="column">
                    {userNavigation.map((item) => (
                      <NavItem key={item.name} {...item} />
                    ))}

                    <Button size="small" asChild variant="ghost" mode="negative">
                      <Link to="/logout">Logout</Link>
                    </Button>
                  </Flex>
                </Card>
              </Popover.Content>
            </Popover.Root>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
