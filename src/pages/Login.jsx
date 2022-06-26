import React, { useState } from 'react'
import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom'

import * as Yup from 'yup'
import jwtDecode from 'jwt-decode'
import { Form, Formik } from 'formik'

import Input from '../components/Input'
import Button from '../components/Button'
import AlertBox from '../components/AlertBox'
import { useCurrentUserContext } from '../contexts/CurrentUserContext'

import api from '../lib/api'
import dashx from '../lib/dashx'
import checkAuth from '../lib/checkAuth'

import DashXLogo from '../assets/dashx_logo_black.png'

const Login = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { setUser } = useCurrentUserContext()
  const isAuthenticated = checkAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const redirectPath = location.state?.from || '/'

  const handleLogin = async (formValues, resetForm) => {
    setError('')
    setLoading(true)

    const { email, password } = formValues
    const requestBody = { email, password }

    try {
      const { data: { token } = {}, status } = await api.post('/login', requestBody)

      if (status === 200 && token) {
        const decodedUser = jwtDecode(token)
        const { dashx_token, user } = decodedUser || {}
        dashx.setIdentity(String(user.id), dashx_token)
        setUser(user)
        localStorage.setItem('jwt-token', token)
        localStorage.setItem('user', JSON.stringify(user))
        navigate(redirectPath, { replace: true })
        resetForm()
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error?.message
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center">
          <img src={DashXLogo} className="h-12 w-12" alt="DashX Logo" />
        </div>
        <h2 className="mt-6 mb-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
        {error && <AlertBox alertMessage={error} />}
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md rounded bg-white shadow shadow-md pt-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="py-8 pt-1 px-4 sm:px-10">
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Email is required'),
                password: Yup.string().required('Password is required')
              })}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                await handleLogin(values, resetForm)
                setSubmitting(false)
              }}
            >
              <Form>
                <Input
                  label="Email"
                  type="email"
                  name="email"
                />
                <Input
                  label="Password"
                  type="password"
                  name="password"
                />
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <div className="mt-7">
                  <Button
                    type="submit"
                    label="Login"
                    loading={loading}
                    message="Logging in"
                  />
                  <Link to="/register">
                    <Button
                      label="Register"
                      variant="outlined"
                      loading={false}
                      classes="mt-3"
                    />
                  </Link>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
