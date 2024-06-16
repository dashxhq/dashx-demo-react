import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { DashXProvider, Theme } from '@dashx/react'

import App from './App'
import CurrentUserProvider from './contexts/CurrentUserContext'
import reportWebVitals from './reportWebVitals'

import './index.css'
import '@dashx/react/styles.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DashXProvider
        baseUri={process.env.REACT_APP_DASHX_BASE_URI}
        realtimeBaseUri={process.env.REACT_APP_DASHX_REALTIME_URI}
        publicKey={process.env.REACT_APP_DASHX_PUBLIC_KEY}
        targetEnvironment={process.env.REACT_APP_DASHX_TARGET_ENVIRONMENT}
      >
        <Theme>
          <CurrentUserProvider>
            <App />
          </CurrentUserProvider>
        </Theme>
      </DashXProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
