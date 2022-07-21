import React from 'react'

const Pricing = ({ originalAmount, amount }) => (
  <div className="text-center text-md text-gray-900">
    {originalAmount ? (
      <div className="space-x-2">
        <del>${originalAmount}</del>
        <span>${amount}</span>
      </div>
    ): (
      <span>${amount}</span>
    )}
  </div>
)

export default Pricing
