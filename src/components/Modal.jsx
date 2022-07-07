import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import * as Yup from 'yup'
import { Form, Formik } from 'formik'

import TextArea from './TextArea'

const Modal = ({ open, setOpen, handleSubmit }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
                  <div className="flex items-start">
                    <h2 className="font-medium text-md w-1/4">
                      Create a Post
                    </h2>
                    <Formik
                      initialValues={{
                        text: '',
                      }}
                      validationSchema={Yup.object({
                        text: Yup.string().required('Text is required')
                      })}
                      onSubmit={async (values, { setSubmitting, resetForm }) => {
                        handleSubmit(values, resetForm)
                        setSubmitting(false)
                      }}
                    >
                      <Form className="w-3/4">
                        <TextArea label="Text" name="text" rows={8} />
                        <div className="py-3 pt-5 sm:flex justify-start items-start flex-row-reverse">
                          <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            Post
                          </button>
                          <button
                            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-gray-600 font-medium text-black border-gray-300 hover:bg-gray-50 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setOpen(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal