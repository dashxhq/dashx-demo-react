import jwtDecode from 'jwt-decode'
import React, { createContext, useContext, useState } from 'react'
import { useDashXProvider } from '@dashx/react'

const jwtToken = localStorage.getItem('jwt-token')
const decodedUser = jwtToken ? jwtDecode(jwtToken).user : null

const CurrentUserContext = createContext(null)

const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState(decodedUser)
  let dashx = useDashXProvider()

  const login = (authToken, dashXToken) => {
    localStorage.setItem('jwt-token', authToken)
    const decodedToken = jwtDecode(authToken)
    const decodedUser = decodedToken.user
    dashx.setIdentity(decodedUser.id, dashXToken)
    setUser(decodedUser)
  }

  const logout = () => {
    dashx.reset()
    localStorage.removeItem('jwt-token')
    setUser(null)
  }

  return (
    <CurrentUserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

const useCurrentUserContext = () => useContext(CurrentUserContext)

export { useCurrentUserContext }
export default CurrentUserProvider
