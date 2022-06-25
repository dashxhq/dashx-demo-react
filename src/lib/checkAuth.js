const checkAuth = () => {
  return Boolean(localStorage.getItem('jwt-token'))
}

export default checkAuth
