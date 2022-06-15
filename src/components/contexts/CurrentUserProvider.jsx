import React, { createContext, useContext, useState } from 'react'
import jwt from 'jwt-decode'
import api from '../../lib/api'
import { useLocalStorage } from '../hooks/useLocalStorage'
import dashx from '../../lib/dashx'

const CurrentUserContext = createContext(null)

const CurrentUserProvider = ({ children }) => {
  const [ user, setUser ] = useState(null)
  const [ jwtToken, setJwtToken ] = useLocalStorage('jwt', '')
  const [ _, setDashToken ] = useLocalStorage('dashxToken', '')

  const login = async (loginFields) => {
    const { data: { data } = {}, status } = await api.post('/login', loginFields)
    const { session: { dashxToken, id } = {} } = jwt(data?.token) || {}
    dashx?.setIdentity(String(id), dashxToken)
    setJwtToken(data?.token)
    setDashToken(dashxToken)
    setUser(data)
    return { data, status }
  }

  const update = async (updateFields) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    }
    const { data: { data } = {}, status } = await api.put('/update/profile', updateFields, headers)
    return { data, status }
  }

  const register = async (registerFields) => {
    const { data: { data } = {}, status } = await api.put('/register', registerFields)
    return { data, status }
  }

  return (
    <CurrentUserContext.Provider value={{ user, login, update, register, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

const useAuth = () => useContext(CurrentUserContext)

export { useAuth }
export default CurrentUserProvider
