import React from 'react'
import { useOutletContext } from 'react-router-dom'

import { XIcon as XIconSolid } from '@heroicons/react/solid'

import Button from '../components/Button'
import EmptyView from '../components/EmptyView'
import Loader from '../components/Loader'
import Pricing from '../components/Pricing'

import formatCurrency from '../lib/formatCurrency'

import { productImages } from '../constants/productImages'

const Cart = () => {
  const { cartDetails, fetchingCartItems } = useOutletContext()
  const {
    orderItems: cartItems = [],
    subtotal,
    total,
    tax,
    currencyCode,
  } = cartDetails

  return (
    <div>
      {fetchingCartItems && <Loader />}
      {!cartItems.length && !fetchingCartItems && <EmptyView message="No products in cart" />}

      {cartItems.length > 0 && (
        <div className="max-w-7xl m-auto">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl mb-6">
            Cart
          </h1>
          <main className="mx-auto pb-24 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              {cartItems.map(({ item }) => (
                <section aria-labelledby="cart-heading" className="lg:col-span-7" key={item.id}>
                  <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                    <li key={item.id} className="flex py-6 sm:py-7">
                      <div className="flex-shrink-0">
                        <img
                          src={productImages[item.identifier]}
                          alt={item.name}
                          className="w-24 h-24 rounded-md object-center cursor-pointer object-cover sm:w-48 sm:h-48"
                        />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                        <div className="relative sm:flex">
                          <div>
                            <h2 className="font-medium text-black cursor-pointer">
                              {item.name}
                            </h2>
                              <Pricing
                                amount={item.pricings[0].amount}
                                currency={item.pricings[0].currencyCode}
                              />
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
              ))}
            </div>
            <div>
              <form>
                <section
                  aria-labelledby="summary-heading"
                  className="mt-16 bg-gray-100 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
                >
                  <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                    Order summary
                  </h2>

                  <dl className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm font-medium text-gray-700">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {formatCurrency(subtotal, currencyCode)}
                      </dd>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                      <dt className="flex text-sm font-medium text-gray-700">
                        <span>Tax estimate</span>
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {formatCurrency(tax, currencyCode)}
                      </dd>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                      <dt className="text-base font-medium text-gray-900">Order total</dt>
                      <dd className="text-base text-lg font-medium text-gray-900">
                        {formatCurrency(total, currencyCode)}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-12">
                    <Button
                      type="button"
                      classes="w-full h-13 rounded-md py-3 px-8 flex items-center justify-center font-medium text-white hover:bg-indigo-700"
                    >
                      Checkout
                    </Button>
                  </div>
                </section>
              </form>
            </div>
          </main>
        </div>
      )}
    </div>
  )
}

export default Cart
