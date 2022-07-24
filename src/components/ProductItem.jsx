import React from 'react'

import Pricing from '../components/Pricing'

import { productImages } from '../constants/productImages'

const ProductItem = ({ product, onClickProduct }) => {
  const originalAmount = product.pricings[0].originalAmount || null
  const amount = product.pricings[0].amount

  return (
    <div className="group relative text-center cursor-pointer" onClick={onClickProduct}>
      <div className="w-full rounded-md overflow-hidden">
        <img
          src={productImages[product.identifier]}
          alt={product.name}
          className="w-full h-full object-center object-cover group-hover:opacity-75"
        />
      </div>
      <div className="mt-6">
        <h3 className="mt-1 mb-2 font-semibold text-gray-900">{product.name}</h3>
        <Pricing originalAmount={originalAmount} amount={amount} />
      </div>
    </div>
  )
}

export default ProductItem
