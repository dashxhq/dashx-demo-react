import DashX from '@dashx/browser'

const dashx = DashX({
  baseUri: process.env.REACT_APP_DASHX_BASE_URI,
  publicKey: process.env.REACT_APP_DASHX_PUBLIC_KEY,
  targetEnvironment: process.env.REACT_APP_DASHX_TARGET_ENVIRONMENT
})

export default dashx
