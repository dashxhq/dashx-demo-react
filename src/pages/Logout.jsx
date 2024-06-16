import { useEffect } from 'react'
import Loader from '../components/Loader'
import { useCurrentUserContext } from '../contexts/CurrentUserContext'

function Logout() {
  const { logout } = useCurrentUserContext()

  useEffect(() => {
    logout()
  }, [logout])

  return <Loader message="Loggin out..." />
}

export default Logout
