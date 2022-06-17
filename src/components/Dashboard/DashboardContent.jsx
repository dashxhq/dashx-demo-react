import React from 'react'

const DashboardContent = ({ children }) => (
  <main className="flex-1">
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          {children}
        </div>
        {/* /End replace */}
      </div>
    </div>
  </main>
)

export default DashboardContent