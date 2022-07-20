import React, { useEffect, useState } from 'react'

import Modal from '../components/Modal'
import Button from '../components/Button'
import ErrorBox from '../components/ErrorBox'
import Post from '../components/Post'
import Loader from '../components/Loader'

import api from '../lib/api'

const Home = () => {
  const [postsList, setPostsList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState('')
  const [fetchingPosts, setFetchingPosts] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchPosts = async () => {
    try {
      setFetchingPosts(true)
      const { data: { posts } = {} } = await api.get('/posts')
      setPostsList(posts)
    } catch (error) {
      setError('Something went wrong, Please try again later.')
    } finally {
      setFetchingPosts(false)
    }
  }

  const handleSubmit = async (values, resetForm) => {
    if (error) {
      setError('')
    }
    setLoading(true)

    try {
      const { status } = await api.post('/posts', values)
      if (status === 200) {
        resetForm()
        await fetchPosts()
      }
    } catch (error) {
      setError('Something went wrong, Please try again later.')
      setTimeout(() => {
        setError('')
      }, 3000)
    } finally {
      setIsModalOpen(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <>
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Posts</h1>
        <div>
          <Button label="Add Post" loading={false} onClick={() => setIsModalOpen(true)} />
        </div>
      </div>
      {error && <ErrorBox alertMessage={error} />}
      <div>
        {fetchingPosts && <Loader />}
        {(!postsList.length && !fetchingPosts && !error) && <h1 className="font-medium">No Posts</h1>}
      </div>
      <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {postsList.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </>
  )
}

export default Home
