import React, { useRef, useState } from 'react'

import { UploadIcon } from '@heroicons/react/outline'

const UploadAvatar = ({ label, name, file = '', setFieldValue }) => {
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
        accept="image/*"
        type="file"
        ref={fileInputRef}
        name={name}
        className="sr-only hidden"
        onChange={handleChange}
      />
      {file ? (
        <div className="relative w-44 h-44 lg:block">
          <img
            name={name}
            src={preview || file}
            className="rounded-full w-full h-full m-auto border border-gray-300 object-cover cursor-pointer"
            alt="Preview"
          />
          <label
            className="absolute inset-0 w-44 h-44 rounded-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100 cursor-pointer"
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
            className="absolute top-50 bg-gray-100 px-3 mt-3 py-2 border border-transparent rounded-md text-sm font-medium text-black focus:outline-none ml-12"
          >
            Remove
          </button>
        </div>
      ) : (
         <div className="max-w-lg w-44 h-44 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-full">
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

export default UploadAvatar
