import React from 'react'
import UpdateProfileForm from '../forms/UpdateProfileForm'
import Bookmarks from './Bookmarks'
import Billing from './Billing'
import Settings from './Settings'
import DashboardHome from './DashboardHome'

const DashboardContent = ({ children, path }) => {

  const RenderDashboardContent = () => {

    if (path === '/update-profile') {
      return <UpdateProfileForm />
    }

    if (path === '/bookmarks') {
      return <Bookmarks />
    }

    if (path === '/billing') {
      return <Billing />
    }

    if (path === '/settings') {
      return <Settings />
    }

    return <DashboardHome />
  }

  return (
    <div className="md:pl-64 flex flex-col h-full">
      <main className="flex-1 h-screen">
        <div className="py-6">
          <div className="max-w-7xl px-4 sm:px-6 md:px-8"></div>
          <div className="max-w-7xl px-4 sm:px-6 md:px-8">
            {children}
            <RenderDashboardContent />
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardContent
