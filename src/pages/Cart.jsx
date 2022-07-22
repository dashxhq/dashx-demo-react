import { useEffect, useState } from 'react'

import {  XIcon as XIconSolid } from '@heroicons/react/solid'

import EmptyView from '../components/EmptyView'
import ErrorBox from '../components/ErrorBox'
import Loader from '../components/Loader'
import Pricing from '../components/Pricing'

import api from '../lib/api'

import { productImages } from '../constants/productImages'

const Cart = () => {
  const [productsList, setProductsList] = useState([])
  const [fetchingProducts, setFetchingProducts] = useState(false)
  const [error, setError] = useState('')

  const fetchProducts = async () => {
    setFetchingProducts(true)
    try {
      const { data: { products } = {} } = await api.get('/products')
      setProductsList(products)
    } catch (error) {
      setError(error.message)
    }
    setFetchingProducts(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div>
      {error && <ErrorBox message={error} />}
      {fetchingProducts && <Loader />}
      {!productsList.length && !fetchingProducts && !error && <EmptyView message="No products" />}
      {productsList.length > 0 && (
        <main className="mx-auto pb-24">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl">Cart</h1>

          <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <ul
                className="border-t border-b border-gray-200 divide-y divide-gray-200"
              >
                {productsList.map((product) => (
                  <li key={product.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={productImages[product.identifier]}
                        alt={product.name}
                        className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                      />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                      <div className="relative pr-9 sm:grid place-items-start sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <h2 className="font-medium text-gray-700 hover:text-gray-800">
                            {product.name}
                          </h2>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            <Pricing amount={product.pricings[0].amount} />
                          </p>
                        </div>
                        <div className="absolute top-0 right-0">
                          <button
                            type="button"
                            className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <XIconSolid className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
            >
              <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">$99.00</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Shipping estimate</span>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="flex text-sm text-gray-600">
                    <span>Tax estimate</span>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">$8.32</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">Order total</dt>
                  <dd className="text-base font-medium text-gray-900">$112.32</dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  Checkout
                </button>
              </div>
            </section>
          </form>
        </main>
      )}
    </div>
  )
}

export default Cart
