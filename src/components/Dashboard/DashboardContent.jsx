import React from 'react'

const DashboardContent = ({ children }) => (
  <div className="md:pl-64 flex flex-col h-full">
    <main className="flex-1 h-screen">
      <div className="py-6">
        <div className="max-w-7xl px-4 sm:px-6 md:px-8"></div>
        <div className="max-w-7xl px-4 sm:px-6 md:px-8">
          {children}
          {/*
          <div className="py-4">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
          </div>
*/}
          {/* /End replace */}
        </div>
      </div>
    </main>
  </div>
)

export default DashboardContent
