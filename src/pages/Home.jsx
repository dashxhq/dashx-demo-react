import React, { useEffect, useState } from 'react'

import Modal from '../components/Modal'
import Button from '../components/Button'

const postLists = [
  {
    id: 1,
    text: 'tesing post feature',
    user_id: 30,
    created_at: '2022-07-03T18:30:00.000Z',
    updated_at: '2022-07-03T18:30:00.000Z',
    image: null,
    video: null,
    first_name: 'Rahul',
    last_name: 'SR',
    email: 'abc@gmail.com'
  },
  {
    id: 2,
    text: 'tesing post feature 1',
    user_id: 30,
    created_at: '2022-07-03T18:30:00.000Z',
    updated_at: '2022-07-03T18:30:00.000Z',
    image: null,
    video: null,
    first_name: 'Rahul',
    last_name: 'SR',
    email: 'abc@gmail.com'
  },
  {
    id: 3,
    text: 'tesing post feature 2',
    user_id: 30,
    created_at: '2022-07-03T18:30:00.000Z',
    updated_at: '2022-07-03T18:30:00.000Z',
    image: null,
    video: null,
    first_name: 'Rahul',
    last_name: 'SR',
    email: 'abc@gmail.com'
  },
  {
    id: 4,
    text: 'tesing post feature 3',
    user_id: 30,
    created_at: '2022-07-03T18:30:00.000Z',
    updated_at: '2022-07-03T18:30:00.000Z',
    image: null,
    video: null,
    first_name: 'Rahul',
    last_name: 'SR',
    email: 'abc@gmail.com'
  },
  {
    id: 5,
    text: 'tesing post feature 4',
    user_id: 30,
    created_at: '2022-07-03T18:30:00.000Z',
    updated_at: '2022-07-03T18:30:00.000Z',
    image: null,
    video: null,
    first_name: 'Rahul',
    last_name: 'SR',
    email: 'abc@gmail.com'
  }
]

const Post = ({ post }) => {
  return (
    <div className="mb-4">
      <div className="relative flex gap-4">
        <img
          className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
          alt=""
        />
        <span className="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px"></span>
        <div className="min-w-0 flex-1">
          <div>
            <div className="text-sm font-medium">
              {post.first_name} {post.last_name}
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Posted {new Date(post.created_at).getDay()}d ago
            </p>
          </div>
          <div className="mt-2 text-sm text-gray-700">
            <p>{post.text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const Home = () => {
  const [posts, setPosts] = useState(postLists)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    console.log('Came herer for fetching')
  }, [isModalOpen])

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Posts</h1>
        <div className="max-w-xs mt-0">
          <Button label="Add Post" loading={false} onClick={() => setIsModalOpen(true)} />
        </div>
      </div>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
      <Modal open={isModalOpen} setOpen={setIsModalOpen} />
    </div>
  )
}

export default Home
