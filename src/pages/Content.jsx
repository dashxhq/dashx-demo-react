import React from 'react'
import { Outlet } from 'react-router-dom'

const Content = ({ children }) => {
  return (
    <div className="md:pl-64 flex flex-col h-full">
      <main className="flex-1 h-screen">
        <div className="py-6">
          <div className="max-w-8xl px-4 sm:px-6 md:px-8">
            <Outlet context={{ ...children.props.context }} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Content
