import React, { useEffect, useState } from 'react'

import Modal from '../components/Modal'
import Button from '../components/Button'

const postLists = [
  {
    id: 1,
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,',
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
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,',
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
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,',
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
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,',
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
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,',
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
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
    <div className="m-auto">
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
