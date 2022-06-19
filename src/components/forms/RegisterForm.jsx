import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../Button'
import { loginFields, registerFields } from '../../constants/formFields'
import Input from '../Input'
import AlertBox from '../AlertBox'

import { useAuth } from '../contexts/CurrentUserProvider'
import DashXLogo from '../../assets/dashx-logo.svg'

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
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md rounded bg-white shadow shadow-md pt-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center gap-6 items-center">
            <img src={DashXLogo} width="30px" height="30px" alt="DashX Logo" />
            <span className="text-2xl font-bold">Demo App</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up for an account
          </h2>
        </div>
        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="py-8 px-4 sm:px-10">
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
                console.log(values, 'values')
                // await handleLogin(values, resetForm)
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
                <div className="mt-7">
                  <Button type="submit" label="Register" loading={loading} message="Logging in" />
                  <Link to="/login">
                    <Button type="submit" label="Login" variant="outlined" loading={false} />
                  </Link>
                </div>
                {error && (<AlertBox alertMessage={error} />)}
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm

/* <Formik
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
  console.log(values, 'values')
  // await handleLogin(values, resetForm)
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
<Button type="submit" label="Register" loading={loading} message="Logging in" />
<Link to="/login">
  <Button type="submit" label="Login" variant="outlined" loading={false} />
</Link>
{error && (<AlertBox alertMessage={error} />)}
</Form>
</Formik> */

/* <form action="#" method="POST">
  <div>
  <label
htmlFor="email"
className="block text-sm font-medium text-gray-700"
  >
  Email address
</label>
<div className="mt-1">
  <Input />
</div>
</div>

<div className="mt-6">
  <label
    htmlFor="password"
    className="block text-sm font-medium text-gray-700"
  >
    Password
  </label>
  <div className="mt-1">
    <input
      id="password"
      name="password"
      type="password"
      autoComplete="current-password"
      required
      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
</div>
<div className="mt-6">
  <div>
    <button
      type="submit"
      className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Sign in
    </button>
  </div>
  <div className="mt-0">
    <button
      type="submit"
      className="mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Register
    </button>
  </div>
</div>
</form> */
