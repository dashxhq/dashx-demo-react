import React from 'react'

const truncateAmount = (amount) => Math.trunc(amount)

const Pricing = ({ originalAmount, amount }) => (
  <div className="text-md font-medium text-gray-900">
    {originalAmount ? (
      <div className="space-x-2">
        <del>${truncateAmount(originalAmount)}</del>
        <span>${truncateAmount(amount)}</span>
      </div>
    ): (
      <span>${truncateAmount(amount)}</span>
    )}
  </div>
)

export default Pricing
