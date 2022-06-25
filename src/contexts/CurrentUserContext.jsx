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

const useCurrentUserContext = () => useContext(CurrentUserContext)

export { useCurrentUserContext }
export default CurrentUserProvider
