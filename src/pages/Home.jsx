import React, { useEffect, useState } from 'react'

import Modal from '../components/Modal'
import Button from '../components/Button'

import api from '../lib/api'

const Post = ({ post }) => {
  const { id, created_at, text, user } = post || {}
  const { first_name, last_name } = user

  return (
    <div className="relative flex gap-4 mb-4" key={id}>
      <img
        className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">
          {first_name}&nbsp;{last_name}
        </p>
        <p className="mt-0.5 text-sm text-gray-500">Posted {new Date(created_at).getDay()}d ago</p>
        <div className="mt-2 text-sm text-gray-700">
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

const Home = () => {
  const [postsList, setPostsList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function fetchPosts() {
    const params = {
      params: {
        limit: 5,
        offset: 5
      }
    }
    try {
      const { data: { posts } = {} } = await api.get('/posts')
      setPostsList(posts)
    } catch (error) {
      console.log(error, 'error - fetchPosts')
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleSubmit = async (values, resetForm) => {
    try {
      setIsModalOpen(false)
      const { status } = await api.post('/posts', values)
      if (status === 200) {
        setIsModalOpen(false)
        await fetchPosts()
        resetForm()
      }
    } catch (error) {
      console.log(error, 'error')
    }
  }

  return (
    <div className="m-auto">
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Posts</h1>
        <div className="max-w-xs mt-0">
          <Button label="Add Post" loading={false} onClick={() => setIsModalOpen(true)} />
        </div>
      </div>
      <div>
        {postsList.length > 0 ? (
          postsList.map((post) => <Post post={post} key={post.id} />)
        ) : (
          <h1 className="text-lg font-medium text-gray-900">No Posts</h1>
        )}
      </div>
      <Modal open={isModalOpen} setOpen={setIsModalOpen} handleSubmit={handleSubmit} />
    </div>
  )
}

export default Home
