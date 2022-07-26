import { Fragment, useRef } from 'react'
import { Link } from 'react-router-dom'

import { Popover, Transition } from '@headlessui/react'
import { ShoppingCartIcon } from '@heroicons/react/outline'
import classNames from 'classnames'

import EmptyView from './EmptyView'
import Pricing from './Pricing'

import { productImages } from '../constants/productImages'

const CartPopover = ({ cartItems }) => {
  const buttonRef = useRef(null)

  return (
    <>
      <Popover className="relative mx-auto flex items-center">
        {({ open, close }) => (
          <>
            <Popover.Button ref={buttonRef}>
              <ShoppingCartIcon className="max-w-xs text-gray-600 w-6 h-6 focus:none" />
            </Popover.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="absolute right-2 top-8 z-10 w-[420px] h-[440px] mx-auto"
              >
                <div
                  className={classNames(
                    'relative h-full bg-white',
                    'border border-gray-300 border-solid',
                    'rounded-md flex flex-col'
                  )}
                >
                  {!cartItems.length ? (
                    <div className="pt-5">
                      <EmptyView message="Your cart is empty" />
                    </div>
                  ) : (
                    <>
                      <ul role="list" className="divide-y divide-gray-200">
                        {cartItems.slice(0, 5).map(({ item }) => (
                          <li key={item.id} className="hover:bg-gray-50 h-20 p-2 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div className="w-16 h-16">
                                <img
                                  src={productImages[item.identifier]}
                                  className="w-full h-full"
                                  alt={item.name}
                                />
                              </div>
                              <div className="min-w-0 flex flex-col items-end text-sm">
                                <p className="font-medium text-gray-900 truncate">{item.name}</p>
                                <Pricing
                                  amount={item.pricings[0].amount}
                                  currency={item.pricings[0].currencyCode}
                                />
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <Link
                    to="/store/cart"
                    className="text-indigo-600 text-center font-bold text-sm mt-auto hover:bg-gray-50 p-2 cursor-pointer border border-t-gray-100 rounded-sm"
                    onClick={close}
                  >
                    View cart &rarr;
                  </Link>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  )
}

export default CartPopover
