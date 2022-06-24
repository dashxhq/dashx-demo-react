import React, { createContext, useContext, useState } from 'react'

const CurrentUserContext = createContext(null)

const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

const useAuth = () => useContext(CurrentUserContext)

export { useAuth }
export default CurrentUserProvider
