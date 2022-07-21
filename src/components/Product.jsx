import React from 'react'

import Pricing from '../components/Pricing'

const productImages = {
  pen: 'https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg',
  notebook: 'https://tailwindui.com/img/ecommerce-images/home-page-02-product-04.jpg',
  'coffee-mug': 'https://tailwindui.com/img/ecommerce-images/home-page-02-product-02.jpg',
  'paper-subscription':
    'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-04.jpg',
  'notebook-subscription': 'https://tailwindui.com/img/ecommerce-images/home-page-02-product-03.jpg'
}

const Product = ({ product }) => {
  const originalAmount = Math.trunc(product.pricings[0].originalAmount) || null
  const amount = Math.trunc(product.pricings[0].amount)

  return (
    <div className="group relative text-center cursor-pointer">
      <div className="w-full rounded-md overflow-hidden">
        <img
          src={productImages[product.identifier]}
          alt={product.name}
          className="w-full h-full object-center object-cover group-hover:opacity-75"
        />
      </div>
      <div className="mt-6">
        <h3 className="mt-1 mb-2 font-semibold text-gray-900">
          {product.name}
        </h3>
        <Pricing originalAmount={originalAmount} amount={amount} />
      </div>
    </div>
  )
}

export default Product
