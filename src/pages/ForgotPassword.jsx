import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Button from '../components/Button'
import Input from '../components/Input'
import AlertBox from '../components/AlertBox'
import SuccessBox from '../components/SuccessBox'
import FormHeader from '../components/FormHeader'

import api from '../lib/api'

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (values, resetForm) => {
    setLoading(true)
    setSuccessMessage('')
    setError('')

    try {
      const { data: { message } = {}, status } = await api.post('/forgot-password', values)
      if (status === 200) {
        setSuccessMessage(message)
        resetForm()
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error?.message || 'Something went wrong, please try later'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 m-auto">
      <FormHeader>
        Forgot Password
      </FormHeader>
      {error && (
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <AlertBox alertMessage={error} />
        </div>
      )}
      <div className="sm:mx-auto sm:w-full mb-4 mt-4 sm:max-w-md rounded bg-white shadow shadow-md p-9">
        {successMessage && (
          <div className="text-center">
            <SuccessBox successMessage={successMessage} />
          </div>
        )}
        {!successMessage && (
          <div>
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
                <Input label="Email" type="email" name="email" />
                <Button type="submit" label="Submit" loading={loading} />
              </Form>
            </Formik>
          </div>
        )}
        <div className="text-sm text-center pt-6">
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
