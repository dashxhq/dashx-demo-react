import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import EmptyView from '../components/EmptyView'
import ErrorBox from '../components/ErrorBox'
import Loader from '../components/Loader'
import ProductItem from '../components/ProductItem'

import api from '../lib/api'

const Store = () => {
  const [productsList, setProductsList] = useState([])
  const [fetchingProducts, setFetchingProducts] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

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

  const onClickProduct = (product) => {
    navigate(`products/${product.id}`, { state: { product } })
  }

  useEffect(() => {
    if (location.pathname === '/store') {
      fetchProducts()
    }
  }, [location.pathname])

  return (
    <>
      {location.pathname.includes('/store/products/') || location.pathname.includes('/store/cart') ? (
        <Outlet />
      ) : (
        <>
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Store</h1>
          {error && <ErrorBox message={error} />}
          {fetchingProducts && <Loader />}
          {!productsList.length && !fetchingProducts && !error && (
            <EmptyView message="No products" />
          )}
          {productsList.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 gap-4">
              {productsList.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  onClickProduct={() => onClickProduct(product)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default Store
