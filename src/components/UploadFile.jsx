import React, { useRef, useState } from 'react'

import { UploadIcon } from '@heroicons/react/outline'

const UploadFile = ({ accept, label, name, file = '', setFieldValue, classes }) => {
  const [preview, setPreview] = useState(file)
  const fileInputRef = useRef(null)

  const handleChange = (event) => {
    try {
      const file = event.target.files[0]
      if (file) {
        setFieldValue(name, file)
        setPreview(URL.createObjectURL(file))
      }
    } catch (error) {
      console.error(error)
    }
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
        type="file"
        ref={fileInputRef}
        name={name}
        accept={accept}
        className="sr-only hidden"
        onChange={handleChange}
      />

      {file && accept === 'image/*' ? (
        <div
          className={`
            relative h-40 lg:block
            ${classes}
          `}
        >
          <img
            name={name}
            src={preview || file}
            className="w-full h-full m-auto border border-gray-300 object-cover cursor-pointer"
            alt="Preview"
          />
          <label
            className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100 cursor-pointer
            "
            onClick={() => {
              fileInputRef.current.click()
            }}
          >
            <span>Change</span>
          </label>
          <button
            type="button"
            onClick={() => {
              setFieldValue(name, null)
              setPreview(null)
            }}
            className="absolute top-50 bg-gray-100 px-3 mt-1 py-2 border border-transparent rounded-md text-sm font-medium text-black focus:outline-none"
          >
            Remove
          </button>
        </div>
      ) : file && accept === 'video/*' ? (
        <div
          className={`
            relative h-40 lg:block
            ${classes}
          `}
        >
          <video
            src={preview || file}
            controls
            className={`
              w-full h-full m-auto border border-gray-300 object-cover cursor-pointer
            `}
          />
          <button
            type="button"
            onClick={() => {
              setFieldValue(name, null)
              setPreview(null)
            }}
            className="absolute bg-gray-100 px-3 mt-1 py-2 border border-transparent rounded-md text-sm font-medium text-black focus:outline-none"
          >
            Remove
          </button>
        </div>
      ) : (
            <div className="max-w-lg h-40 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadIcon className="w-8 h-8 text-gray-400 m-auto" />
                <div className="flex text-sm text-gray-600">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    <span>{label}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
    </>
  )
}

export default UploadFile
