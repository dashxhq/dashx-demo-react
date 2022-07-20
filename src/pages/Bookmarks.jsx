import React, { useEffect, useState } from 'react'

import Loader from '../components/Loader'
import Post from '../components/Post'
import ErrorBox from '../components/ErrorBox'

import api from '../lib/api'

const Bookmarks = () => {
  const [bookmarksList, setBookmarksList] = useState([])
  const [fetchingBookmarks, setFetchingBookmarks] = useState(false)
  const [error, setError] = useState('')

  const fetchBookmarks = async () => {
    setFetchingBookmarks(true)

    try {
      const { data: { bookmarks } = {} } = await api.get('/posts/bookmarked')
      setBookmarksList(bookmarks)
    } catch (error) {
      setError('Unable to fetch bookmarks.')
    }

    setFetchingBookmarks(false)
  }

  useEffect(() => {
    fetchBookmarks()
  }, [])

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900">Bookmarks</h1>
      {error && <ErrorBox alertMessage={error} />}
      {fetchingBookmarks && <Loader />}
      {!bookmarksList.length && !fetchingBookmarks && !error && (
        <div className="text-center mt-5">
          <h1 className="font-medium text-xl">No Bookmarks Found!</h1>
        </div>
      )}
      {bookmarksList.length > 0 && (
        <div className="grid grid-cols-1 gap-3 mt-5">
          {bookmarksList.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </div>
      )}
    </>
  )
}

export default Bookmarks
