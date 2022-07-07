import React, { useEffect, useState } from 'react'

import Modal from '../components/Modal'
import Button from '../components/Button'
import AlertBox from '../components/AlertBox'
import Post from '../components/Post'

import api from '../lib/api'

const Home = () => {
  const [postsList, setPostsList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState('')

  const fetchPosts = async () => {
    try {
      const { data: { posts } = {} } = await api.get('/posts')
      setPostsList(posts)
    } catch (error) {
      setError('Something went wrong, Please try again later.')
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleSubmit = async (values, resetForm) => {
    if (error) {
      setError('')
    }

    try {
      setIsModalOpen(false)
      const { status } = await api.post('/posts', values)
      if (status === 200) {
        setIsModalOpen(false)
        await fetchPosts()
        resetForm()
      }
    } catch (error) {
      setError('Something went wrong, Please try again later.')
      setTimeout(() => {
        setError('')
      }, 2000)
    }
  }

  return (
    <>
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Posts</h1>
        <div>
          <Button label="Add Post" loading={false} onClick={() => setIsModalOpen(true)} />
        </div>
      </div>
      {error && (
        <div className="max-w-md">
          <AlertBox alertMessage={error} />
        </div>
      )}
      <div>
        {(!postsList.length && !error) && (
          <h1>No Posts</h1>
        )}
        {postsList.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
      <Modal open={isModalOpen} setOpen={setIsModalOpen} handleSubmit={handleSubmit} />
    </>
  )
}

export default Home
