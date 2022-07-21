import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Button from '../components/Button'
import ErrorBox from '../components/ErrorBox'
import FormHeader from '../components/FormHeader'
import Input from '../components/Input'
import { useCurrentUserContext } from '../contexts/CurrentUserContext'

import api from '../lib/api'

const Login = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useCurrentUserContext()

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
        login(token)
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

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <FormHeader>Login to your account</FormHeader>
      {error && <ErrorBox message={error} />}
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
                <Input label="Email" type="email" name="email" />
                <Input label="Password" type="password" name="password" />

                <div className="mt-6 flex items-start justify-between">
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
                  <Button type="submit" label="Login" loading={loading} message="Logging in" />
                  <div className="mt-2">
                    <Link to="/register">
                      <Button label="Register" variant="outlined" loading={false} />
                    </Link>
                  </div>
                </div>
              </Form>
            </Formik>
            <div className="text-sm text-center pt-6">
              <Link to="/contact" className="font-medium text-indigo-600 hover:text-indigo-500">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
