import React, { useRef } from 'react'
import { useField, useFormikContext } from 'formik'
import { UploadIcon } from '@heroicons/react/outline'

import Loader from './Loader'

import dashx from '../lib/dashx'

const UploadAvatar = ({ label, name }) => {
  const { setSubmitting, isSubmitting } = useFormikContext()
  const [field, meta, helpers] = useField(name)
  const { setValue } = helpers

  const fileInputRef = useRef(null)

  const handleChange = async (event) => {
    const file = event.target.files[0]

    if (!file) return null

    setSubmitting(true)

    try {
      const { url } = await dashx.upload({
        file,
        resource: 'user',
        attribute: 'avatar'
      })
      setValue(url)
    } catch (error) {
      console.error(error)
    }

    setSubmitting(false)
  }

  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 sm:mt-px mb-1 sm:pt-2"
      >
        {label}
      </label>
      <input
        accept="image/*"
        type="file"
        ref={fileInputRef}
        name={name}
        className="sr-only hidden"
        onChange={handleChange}
        disabled={isSubmitting}
      />
      {field.value ? (
        <div className="relative w-44 h-44 lg:block">
          <img
            name={name}
            src={field.value}
            className={`
               rounded-full w-full h-full m-auto border border-gray-300 object-cover cursor-pointer
               ${isSubmitting ? 'opacity-50' : ''}
            `}
            alt="Preview"
          />
          {isSubmitting ? (
            <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <label
              className="absolute inset-0 w-44 h-44 rounded-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100 cursor-pointer"
              onClick={() => {
                fileInputRef.current.click()
              }}
            >
              <span>Change</span>
            </label>
          )}
          <button
            type="button"
            onClick={() => {
              setValue(null)
            }}
            className="absolute top-50 bg-gray-100 px-3 mt-3 py-2 border border-transparent rounded-md text-sm font-medium text-black focus:outline-none ml-12"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="relative max-w-lg w-44 h-44 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-full">
          <div className="space-y-1 text-center">
            {isSubmitting ? (
              <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <div className="flex flex-col text-sm text-gray-600">
                <UploadIcon className="w-8 h-8 text-gray-400 m-auto" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                >
                  <span>Upload</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default UploadAvatar
