import React, { useRef } from 'react'

import { UploadIcon } from '@heroicons/react/outline'

const Upload = ({
  label,
  accept,
  name,
  handleChange,
  file,
  setFile,
  setFieldValue,
}) => {
  const fileInputRef = useRef(null)

  return (
    <>
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium text-gray-700 sm:mt-px mb-1 sm:pt-2"
      >
        {label}
      </label>
      {file ? (
        <div className="w-full h-36">
          <img
            src={file}
            className="w-full h-full m-auto border border-gray-300 rounded-md object-cover cursor-pointer hover:opacity-50"
            alt="Preview"
            onClick={() => {
              setFile(null)
              setFieldValue(name, '')
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
                <span>Upload a {label}</span>
                <input
                  ref={fileInputRef}
                  name={name}
                  type="file"
                  accept={accept}
                  className="sr-only"
                  onChange={handleChange}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Upload
