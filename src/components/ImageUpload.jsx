import React, { useRef, useState } from 'react'

import { XIcon, UploadIcon } from '@heroicons/react/outline'

const ImageUpload = ({ label, name, file, setFieldValue, classes }) => {
  const [preview, setPreview] = useState(file)
  const fileInputRef = useRef(null)

  const handleChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (file.type.startsWith('image')) {
          setFieldValue(name, file)
          setPreview(reader.result)
        }
      }
      reader.readAsDataURL(file)
    } else {
      setFieldValue(name, '')
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
        accept="image/*"
        className="sr-only hidden"
        onChange={handleChange}
      />
      {file ? (
        <div className="w-full h-36 relative">
          <div
            className="absolute top-1 right-1 bg-red-500 rounded-full w-5 h-5 flex justify-center items-center"
            onClick={() => {
              setFieldValue(name, '')
              setPreview(null)
            }}
          >
            <XIcon className="w-4 h-4 top-1 right-1 cursor-pointer text-black" />
          </div>
          <img
            name={name}
            src={preview || file}
            className={`
              w-full h-full m-auto border border-gray-300 object-cover cursor-pointer
              ${classes}
            `}
            alt="Preview"
            onClick={() => {
              fileInputRef.current.click()
            }}
          />
        </div>
      ) : (
        <div className="max-w-lg w-full h-36 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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

export default ImageUpload
