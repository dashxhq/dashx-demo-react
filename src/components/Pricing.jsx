import React from 'react'

import formatCurrency from '../lib/formatCurrency'

const Pricing = ({ originalAmount, amount, currency }) => {
  const originalAmountFormatted = formatCurrency(originalAmount, currency)
  const amountFormatted = formatCurrency(amount, currency)

  return (
    <div className="text-md font-medium text-gray-900">
    {originalAmount ? (
      <div className="space-x-2">
        <del>{originalAmountFormatted}</del>
        <span>{amountFormatted}</span>
      </div>
    ) : (
       <span>{amountFormatted}</span>
     )}
  </div>
  )
}

export default Pricing
