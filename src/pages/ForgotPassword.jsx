import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Button from '../components/Button'
import Input from '../components/Input'
import AlertBox from '../components/AlertBox'
import SuccessBox from '../components/SuccessBox'

import api from '../lib/api'

import DashXLogo from '../assets/dashx_logo_black.png'

const field = {
  name: 'email',
  label: 'Email',
  type: 'email'
}

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (values, resetForm) => {
    setLoading(true)
    try{
      const { data: { message } = {}, status } = await api.post('/forgot-password', values)
      if (status === 200) {
        setSuccessMessage(message)
        resetForm()
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Something went wrong, please try later'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 m-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center">
          <img src={DashXLogo} className="h-12 w-12" alt="DashX Logo" />
        </div>
        <h2 className="mt-6 mb-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot Password
        </h2>
        <p className="mt-6 mb-6 px-2 min-w-xs m-auto text-center text-md font-medium text-gray-900">
          Enter the email address associated with your account
        </p>
      </div>
      {successMessage && (<SuccessBox successMessage={successMessage} />)}
      {error && (<AlertBox alertMessage={error} />)}
      <div className="sm:mx-auto sm:w-full mb-4 sm:max-w-md rounded bg-white shadow shadow-md">
        <div className="py-8 px-4 sm:px-8">
          <Formik
            initialValues={{
              email: ''
            }}
            validationSchema={Yup.object({
              email: Yup.string().email('Invalid email address').required('Email is required')
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              await handleSubmit(values, resetForm)
              setSubmitting(false)
            }}
          >
            <Form>
              <Input label={field.label} {...field} />
              <Button type="submit" label="Submit" loading={loading} />
            </Form>
          </Formik>
        </div>
      </div>
      <Link to="/login">
        <p className="underline text-indigo-700 text-md font-medium text-center">Back to Login</p>
      </Link>
    </div>
  )
}

export default ForgotPassword
