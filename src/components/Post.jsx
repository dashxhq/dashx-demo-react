import React from 'react'
import dayjs from '../lib/dayjs'

const Post = ({ post }) => {
  const { created_at, text, user } = post
  const { first_name, last_name } = user
  const published = dayjs(created_at).fromNow()

  return (
    <div className="relative flex gap-4 mb-4">
      <img
        className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt="User Avatar"
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">
          {first_name}&nbsp;{last_name}
        </p>
        <p className="mt-0.5 text-sm text-gray-500">Posted {published}</p>
        <div className="mt-2 text-sm text-gray-700">
          <p className="text-justify">{text}</p>
        </div>
      </div>
    </div>
  )
}

export default Post
