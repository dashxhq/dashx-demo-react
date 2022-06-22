import React, { createContext, useContext, useState } from 'react'
import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import api from '../../lib/api'
import dashx from '../../lib/dashx'

const CurrentUserContext = createContext(null)

const setItem = (key, value) => {
  localStorage.setItem(key, value)
}

const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const jwtToken = localStorage.getItem('jwt')
  const navigate = useNavigate()

  const login = async (loginFields) => {
    const { data: { data } = {}, status } = await api.post('/login', loginFields)

    if (status === 200) {
      const { session: { dashxToken, id } = {} } = jwt(data?.token) || {}
      dashx?.setIdentity(String(id), dashxToken)
      setUser(data)
      setItem('jwt', data?.token)
      setItem('user', JSON.stringify(data))
      setItem('dashxToken', dashxToken)
      navigate('/dashboard', { replace: true })
    }

    return { data, status }
  }

  const update = async (updateFields) => {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const {
      data: { message, status },
    } = await api.patch('/update-profile', updateFields, headers)
    if (status === 200) {
      setUser(updateFields)
    }
    return { message, status }
  }

  const register = async (registerFields) => {
    const { data: { data } = {}, status } = await api.post('/register', registerFields)
    return { data, status }
  }

  const logOut = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
    localStorage.removeItem('dashxToken')
    setUser(null)
    navigate('/')
  }

  return (
    <CurrentUserContext.Provider value={{ user, login, update, register, setUser, logOut }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

const useAuth = () => useContext(CurrentUserContext)

export { useAuth }
export default CurrentUserProvider
