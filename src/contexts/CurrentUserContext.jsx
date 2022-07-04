import React, { createContext, useContext, useState } from 'react'
import jwtDecode from 'jwt-decode'

import dashx from '../lib/dashx'

const jwtToken = localStorage.getItem('jwt-token')
const decodedUser = jwtToken ? jwtDecode(jwtToken).user : null

const CurrentUserContext = createContext(null)

const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState(decodedUser)

  const login = (jwtToken) => {
    localStorage.setItem('jwt-token', jwtToken)
    const decodedToken = jwtDecode(jwtToken)
    const dashxToken = decodedToken.dashx_token
    const decodedUser = decodedToken.user
    dashx.setIdentity(decodedUser.id, dashxToken)
    setUser(decodedUser)
  }

  const logout = () => {
    localStorage.removeItem('jwt-token')
    setUser(null)
  }

  const getJwtToken = () => jwtToken

  return (
    <CurrentUserContext.Provider value={{ user, setUser, login, logout, getJwtToken }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

const useCurrentUserContext = () => useContext(CurrentUserContext)

export { useCurrentUserContext }
export default CurrentUserProvider
