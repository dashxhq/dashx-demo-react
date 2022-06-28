import React, { createContext, useContext, useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'

const CurrentUserContext = createContext(null)

const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const jwtToken = localStorage.getItem('jwt-token')

  useEffect(() => {
    if (jwtToken) {
      const decodedUser = jwtDecode(jwtToken)
      setUser(decodedUser.user)
    }
  }, [])

  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

const useCurrentUserContext = () => useContext(CurrentUserContext)

export { useCurrentUserContext }
export default CurrentUserProvider
