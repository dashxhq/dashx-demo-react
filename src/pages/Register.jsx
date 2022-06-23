import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { registerFields } from '../constants/formFields'
import Input from '../components/Input'
import AlertBox from '../components/AlertBox'

import { useAuth } from '../components/contexts/CurrentUserProvider'
import DashXLogo from '../assets/dashxlogo.svg'

const RegisterForm = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleRegister = async (formValues, resetForm) => {
    setError('')
    setLoading(true)

    const { email, firstName, lastName, password } = formValues
    const requestBody = {
      first_name: firstName,
      last_name: lastName,
      email,
      password
    }

    try {
      const { status } = await register(requestBody)
      if (status === 201) {
        navigate('/login', { replace: true })
        resetForm()
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message
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
            Register for an account
          </h2>
          {error && <AlertBox alertMessage={error} />}
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md rounded bg-white shadow shadow-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="py-8 px-4 sm:px-10">
              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: ''
                }}
                validationSchema={Yup.object({
                  firstName: Yup.string().required('First Name is required'),
                  lastName: Yup.string().required('Last Name is required'),
                  email: Yup.string().email('Invalid email address').required('Email is required'),
                  password: Yup.string().required('Password is required')
                })}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  await handleRegister(values, resetForm)
                  setSubmitting(false)
                }}
              >
                <Form>
                  {registerFields.map((fieldProps) => (
                    <Input key={fieldProps?.label} label={fieldProps?.label} {...fieldProps} />
                  ))}
                  <div className="mt-7">
                    <Button type="submit" label="Register" loading={loading} message="Signing up" />
                    <Link to="/login">
                      <Button type="submit" label="Login" variant="outlined" loading={false} classes="mt-3" />
                    </Link>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
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
                      <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                      </Link>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
    </div>
  )
}

export default RegisterForm
