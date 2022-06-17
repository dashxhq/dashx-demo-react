import React, { useState } from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { loginFields } from '../../constants/formFields'
import Input from '../Input'
import Button from '../Button'
import AlertBox from '../AlertBox'
import { useAuth } from '../contexts/CurrentUserProvider'
import loginImg from '../../assets/loginvector.png'
import dashLogo from '../../assets/dashx-logo.svg'

const LoginForm = () => {
  const [ error, setError ] = useState('')
  const [ loading, setLoading ] = useState(false)
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
        navigate('/dashboard', { replace: true })
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
    <div className="bg-indigo-50">
      <div className="h-screen flex items-center py-12 sm:px-6 lg:px-8">
        <div className="w-1/2 hidden sm:max-w-screen-2xl md:hidden lg:block xl:block">
          <img
            width="100%"
            src={loginImg}
            style={{ maxWidth: '100%', height: '100%' }}
            alt="Login"
          />
        </div>
        <div className="pt-12 pb-3 sm:p-0 m-auto sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="flex justify-center items-center mb-3">
            <img src={dashLogo} style={{ width: '40%', height: '100%' }} alt="DashxLogo" />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="py-6 px-4 sm:px-10">
              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                validationSchema={
                  Yup.object({
                    email: Yup.string()
                      .email('Invalid email address')
                      .required('Email is required'),
                    password: Yup.string().required('Password is required')
                  })
                }
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  await handleLogin(values, resetForm)
                  setSubmitting(false)
                }}
              >
                <Form>
                  {loginFields.map((fieldProps) => (
                    <Input
                      key={fieldProps?.label}
                      label={fieldProps?.label}
                      {...fieldProps}
                    />
                  ))}
                  <Button type="submit" label="Login" loading={loading} message="Logging in" />
                  <Button type="submit" variant="outlined" loading={false}>
                    <Link to="/register">
                      Register
                    </Link>
                  </Button>
                  {error && (<AlertBox alertMessage={error} />)}
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
