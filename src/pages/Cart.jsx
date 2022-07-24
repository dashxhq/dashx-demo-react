import { useEffect, useState } from 'react'

import {  XIcon as XIconSolid } from '@heroicons/react/solid'

import Button from '../components/Button'
import EmptyView from '../components/EmptyView'
import ErrorBox from '../components/ErrorBox'
import Loader from '../components/Loader'
import Pricing from '../components/Pricing'

import { productImages } from '../constants/productImages'

import dashx from '../lib/dashx'

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [fetchingCartItems, setFetchingCartItems] = useState(false)
  const [error, setError] = useState('')

  const fetchCartItems = async () => {
    setFetchingCartItems(true)
    try {
      const response = await dashx.fetchCart()
      console.log(response, 'Fetch cart - response')
    } catch (error) {
      console.error(error)
      setError(error.message)
    }
    setFetchingCartItems(false)
  }

  useEffect(() => {
    fetchCartItems()
  }, [])

  return (
    <div>
      {error && <ErrorBox message={error} />}
      {fetchingCartItems && <Loader />}
      {!cartItems?.length && !fetchingCartItems && !error && (
        <EmptyView message="No products in cart" />
      )}

      {cartItems.length > 0 && (
        <main className="mx-auto pb-24">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl">Cart</h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            {cartItems.map((product) => (
              <>
                <section aria-labelledby="cart-heading" className="lg:col-span-7">
                  <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
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
                  </ul>
                </section>
                Order summary
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
                      <dd className="text-sm font-medium text-gray-900">{product.subtotal}</dd>
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
                      <dd className="text-sm font-medium text-gray-900">{product.tax}</dd>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                      <dt className="text-base font-medium text-gray-900">Order total</dt>
                      <dd className="text-base font-medium text-gray-900">{product.total}</dd>
                    </div>
                  </dl>

                  <div className="mt-6">
                    <Button
                      type="button"
                      classes="mt-12 w-full h-13 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700"
                    >
                      Checkout
                    </Button>
                  </div>
                </section>
              </>
            ))}
          </form>
        </main>
      )}
    </div>
  )
}

export default Cart
