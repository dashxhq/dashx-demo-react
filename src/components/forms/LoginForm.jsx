import React, { useState } from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { loginFields } from '../../constants/formFields'
import Input from '../Input'
import Button from '../Button'
import AlertBox from '../AlertBox'
import { useAuth } from '../contexts/CurrentUserProvider'
import DashXLogo from '../../assets/dashxlogo.svg'

const LoginForm = () => {
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
      const errorMessage = error.response?.data?.message || error.response?.data
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md rounded bg-white shadow shadow-md pt-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center items-center">
              <img src={DashXLogo} width="30px" height="30px" alt="DashX Logo" />
              <span className="text-2xl font-bold ml-4">Demo App</span>
            </div>
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">Sign in</h2>
          </div>
          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="py-8 px-4 sm:px-10">
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
                  <Button type="submit" label="Login" loading={loading} message="Logging in" classes="mt-8" />
                  <Link to="/register">
                    <Button type="submit" label="Register" variant="outlined" loading={false} classes="mt-3" />
                  </Link>
                  {error && <AlertBox alertMessage={error} />}
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm