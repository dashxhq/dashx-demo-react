import React, { useState } from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { loginFields } from '../constants/formFields'
import Input from '../components/Input'
import Button from '../components/Button'
import AlertBox from '../components/AlertBox'
import { useAuth } from '../components/contexts/CurrentUserProvider'
import DashXLogo from '../assets/dashxlogo.svg'

const Login = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const navigate = useNavigate()

  const handleLogin = async (formValues, resetForm) => {
    setError('')
    setLoading(true)

    const { email, password } = formValues
    const requestBody = { email, password }

    try {
      const { status } = await login(requestBody)
      if (status === 200) {
        navigate('/dashboard', { replace: false })
        resetForm()
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data || error?.message
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
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
                {loginFields.map((fieldProps) => (
                  <Input key={fieldProps?.label} label={fieldProps?.label} {...fieldProps} />
                ))}
                <Button
                  type="submit"
                  label="Login"
                  loading={loading}
                  message="Logging in"
                  classes="mt-8"
                />
                <Link to="/register">
                  <Button
                    type="submit"
                    label="Register"
                    variant="outlined"
                    loading={false}
                    classes="mt-3"
                  />
                </Link>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
