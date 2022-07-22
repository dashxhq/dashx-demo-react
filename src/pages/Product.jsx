import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Loader from '../components/Loader'
import ErrorBox from '../components/ErrorBox'
import Pricing from '../components/Pricing'

import api from '../lib/api'
import { productImages } from '../constants/productImages'

const Product = () => {
  const [product, setProduct] = useState({})
  const [fetchingProduct, setFetchingProduct] = useState(false)
  const [error, setError] = useState('')
  const location = useLocation()

  const fetchProduct = async () => {
    setFetchingProduct(true)
    try {
      const { data: { product } = {} } = await api.get(
        `/products/${location.state?.product?.identifier}`
      )
      setProduct(product)
    } catch (error) {
      setError('Unable to fetch product')
    }
    setFetchingProduct(false)
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <div className="max-w-7xl m-auto">
      {fetchingProduct && <Loader />}
      {error && <ErrorBox message={error} />}

      {Object.keys(product).length > 0 && (
        <main className="mt-8 mx-auto pb-16 px-4 sm:pb-24">
          <div className="lg:gap-x-8">
            <div className="lg:col-start-8 grid gap-10 md:grid-cols-1 lg:grid-cols-2 lg:col-span-5">
              <div>
                <img
                  className="w-full h-full border border-gray-200 rounded-lg"
                  src={productImages[product.identifier]}
                  alt={product.name}
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium text-gray-900">{product.name}</h1>
                  <Pricing amount={product.pricings[0].amount} />
                </div>
                <button
                  type="submit"
                  className="mt-8 w-full h-13 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700"
                >
                  Add to cart
                </button>
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Description</h2>
                  <div
                    className="mt-4 prose prose-sm text-gray-500"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  )
}

export default Product
