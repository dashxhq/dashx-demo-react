import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../Button'
import { registerFields } from '../../constants/formFields'
import Input from '../Input'
import AlertBox from '../AlertBox'

import { useAuth } from '../contexts/CurrentUserProvider'
import loginImg from '../../assets/loginvector.png'
import dashLogo from '../../assets/dashx-logo.svg'

const RegisterForm = () => {
  const [ error, setError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const navigate = useNavigate()
  const { register } = useAuth()

  const onSubmitForm = async (formValues, resetForm) => {
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
        navigate('/dashboard', { replace: true })
        resetForm()
      }
    } catch (error) {
      const errorMessage = error.response.data.message
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-indigo-100">
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
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign up for an Account</h2>
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="py-6 px-4 sm:px-10">
              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: ''
                }}
                validationSchema={
                  Yup.object({
                    firstName: Yup.string()
                      .required('First Name is required'),
                    lastName: Yup.string()
                      .required('Last Name is required'),
                    email: Yup.string()
                      .email('Invalid email address')
                      .required('Email is required'),
                    password: Yup.string()
                      .required('Password is required')
                  })
                }
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  await onSubmitForm(values, resetForm)
                  setSubmitting(false)
                }}
              >
                <Form>
                  {registerFields.map((fieldProps) => (
                    <Input
                      key={fieldProps?.label}
                      label={fieldProps?.label}
                      {...fieldProps}
                    />
                  ))}
                  <Button type="submit" label="Register" loading={loading} message="Signing up" />
                  <Button type="submit" variant="outlined" loading={false}>
                    <Link to="/login">
                      Login
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

export default RegisterForm
