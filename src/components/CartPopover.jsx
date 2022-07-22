import { Fragment, useRef } from 'react'
import { Link } from 'react-router-dom'

import { Popover, Transition } from '@headlessui/react'
import { ShoppingCartIcon } from '@heroicons/react/outline'
import classNames from 'classnames'

const CartPopover = () => {
  const buttonRef = useRef(null)

  return (
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
            <Popover.Panel static className="absolute right-2 top-8 z-10 w-96 h-96 mx-auto">
              <div
                className={classNames(
                  'relative h-full bg-white',
                  'border border-gray-300 border-solid',
                  'rounded-md text-center flex flex-col'
                )}
              >
                <h2 className="font-medium text-lg text-center p-2">Cart</h2>
                <div className="block px-4 text-sm text-gray-700 hover:bg-gray-50 p-3 cursor-pointer">
                  Cart Item
                </div>
                <div className="block px-4 text-sm text-gray-700 hover:bg-gray-50 p-3 cursor-pointer">
                  Cart Item
                </div>
                <div
                  onClick={() => close()}
                  className="mt-auto hover:bg-gray-50 p-2 cursor-pointer border border-t-gray-100 rounded-sm"
                >
                  <Link to="/store/cart" className="text-indigo-600 font-bold text-sm">
                    View cart &rarr;
                  </Link>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default CartPopover
