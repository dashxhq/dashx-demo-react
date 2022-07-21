import React, { useEffect, useState } from 'react'

import EmptyView from '../components/EmptyView'
import ErrorBox from '../components/ErrorBox'
import Loader from '../components/Loader'
import Product from '../components/Product'

import api from '../lib/api'

const Store = () => {
  const [productsList, setProductsList] = useState([])
  const [fetchingProducts, setFetchingProducts] = useState(false)
  const [error, setError] = useState('')

  const fetchProducts = async () => {
    setFetchingProducts(true)
    try {
      const { data: { products } = {} } = await api.get('/products')
      setProductsList(products)
    } catch (error) {
      setError(error.message)
    }
    setFetchingProducts(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Store</h1>
      {error && <ErrorBox message={error} />}
      {fetchingProducts && <Loader />}
      {!productsList.length && !fetchingProducts && !error && (
        <EmptyView message="No products" />
      )}
      {productsList.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 gap-4">
          {productsList.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  )
}

export default Store
